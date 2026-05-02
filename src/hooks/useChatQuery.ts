import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/supabase-client";
import { queryClient } from "@/lib/queryClient";
import { queryKeys } from "@/lib/queryKeys";
import type { ChatMessage, ChatRoom, ChatRoomParticipant } from "@/types/chat";

const buildOtherUser = (
  room: { user1_id: string; user2_id: string },
  currentUserId: string,
  profiles: Record<string, ChatRoomParticipant>,
): ChatRoomParticipant => {
  const otherUserId =
    room.user1_id === currentUserId ? room.user2_id : room.user1_id;
  return (
    profiles[otherUserId] ?? {
      user_id: otherUserId,
      full_name: null,
      avatar: null,
    }
  );
};

export const useChatRooms = (userId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.chatRooms(userId!),
    queryFn: async () => {
      const { data: roomRows } = await supabase
        .from("chat_rooms")
        .select("room_id, user1_id, user2_id, created_at, last_message_at")
        .or(`user1_id.eq.${userId!},user2_id.eq.${userId!}`)
        .order("last_message_at", { ascending: false });

      if (!roomRows || roomRows.length === 0) return [];

      const otherUserIds = roomRows.map((r) =>
        r.user1_id === userId ? r.user2_id : r.user1_id,
      );

      const { data: profileRows } = await supabase
        .from("user_profile")
        .select("user_id, full_name, avatar")
        .in("user_id", otherUserIds);

      const profilesById: Record<string, ChatRoomParticipant> = {};
      for (const profile of profileRows ?? []) {
        profilesById[profile.user_id] = {
          user_id: profile.user_id,
          full_name: profile.full_name,
          avatar: profile.avatar,
        };
      }

      const roomIds = roomRows.map((r) => r.room_id);
      const { data: lastMessages } = await supabase
        .from("chat_messages")
        .select("message_id, room_id, sender_id, text, created_at")
        .in("room_id", roomIds)
        .order("created_at", { ascending: false });

      const lastMessageByRoom: Record<string, ChatMessage> = {};
      for (const msg of lastMessages ?? []) {
        if (!lastMessageByRoom[msg.room_id]) {
          lastMessageByRoom[msg.room_id] = msg as ChatMessage;
        }
      }

      return roomRows.map((r) => ({
        room_id: r.room_id,
        user1_id: r.user1_id,
        user2_id: r.user2_id,
        created_at: r.created_at,
        last_message_at: r.last_message_at,
        other_user: buildOtherUser(r, userId!, profilesById),
        last_message: lastMessageByRoom[r.room_id] ?? null,
      })) as ChatRoom[];
    },
    enabled: !!userId,
  });
};

export const useChatMessages = (roomId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.chatMessages(roomId!),
    queryFn: async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("message_id, room_id, sender_id, text, created_at")
        .eq("room_id", roomId!)
        .order("created_at", { ascending: true });
      return (data as ChatMessage[]) ?? [];
    },
    enabled: !!roomId,
  });
};

export const appendMessageToCache = (roomId: string, message: ChatMessage) => {
  queryClient.setQueryData(
    queryKeys.chatMessages(roomId),
    (old: ChatMessage[] | undefined) => {
      if (!old) return [message];
      if (old.some((m) => m.message_id === message.message_id)) return old;
      return [...old, message];
    },
  );
};

export const useSendMessage = (currentUserId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      roomId,
      senderId,
      text,
    }: {
      roomId: string;
      senderId: string;
      text: string;
    }) => {
      const trimmedText = text.trim();
      if (!trimmedText) return null;

      const { data: inserted } = await supabase
        .from("chat_messages")
        .insert({ room_id: roomId, sender_id: senderId, text: trimmedText })
        .select("message_id, room_id, sender_id, text, created_at")
        .single();

      if (!inserted) return null;

      await supabase
        .from("chat_rooms")
        .update({ last_message_at: inserted.created_at })
        .eq("room_id", roomId);

      return inserted as ChatMessage;
    },
    onSuccess: (newMessage, { roomId }) => {
      if (!newMessage) return;
      appendMessageToCache(roomId, newMessage);
      if (currentUserId) {
        queryClient.setQueryData(
          queryKeys.chatRooms(currentUserId),
          (old: ChatRoom[] | undefined) => {
            if (!old) return old;
            return old
              .map((room) =>
                room.room_id === roomId
                  ? {
                      ...room,
                      last_message: newMessage,
                      last_message_at: newMessage.created_at,
                    }
                  : room,
              )
              .sort(
                (a, b) =>
                  new Date(b.last_message_at).getTime() -
                  new Date(a.last_message_at).getTime(),
              );
          },
        );
      }
    },
  });
};

export const useStartConversation = (currentUserId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      currentUserId: callerId,
      otherUserId,
    }: {
      currentUserId: string;
      otherUserId: string;
    }) => {
      const { data: existing } = await supabase
        .from("chat_rooms")
        .select("room_id")
        .or(
          `and(user1_id.eq.${callerId},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${callerId})`,
        )
        .maybeSingle();

      if (existing) return existing.room_id as string;

      const { data: created } = await supabase
        .from("chat_rooms")
        .insert({ user1_id: callerId, user2_id: otherUserId })
        .select("room_id")
        .single();

      if (!created) throw new Error("Failed to create chat room");
      return created.room_id as string;
    },
    onSuccess: () => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.chatRooms(currentUserId),
        });
      }
    },
  });
};
