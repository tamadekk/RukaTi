import { create } from "zustand";
import supabase from "@/supabase-client";
import type { ChatMessage, ChatRoom, ChatRoomParticipant } from "@/types/chat";

type ChatStore = {
  rooms: ChatRoom[];
  messages: Record<string, ChatMessage[]>;
  isLoadingRooms: boolean;
  isLoadingMessages: boolean;

  loadRooms: (userId: string) => Promise<void>;
  loadMessages: (roomId: string) => Promise<void>;
  sendMessage: (
    roomId: string,
    senderId: string,
    text: string,
  ) => Promise<void>;
  startConversation: (
    currentUserId: string,
    otherUserId: string,
  ) => Promise<string>;
  appendMessage: (message: ChatMessage) => void;
  updateRoomLastMessage: (roomId: string, message: ChatMessage) => void;
};

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

export const useChatStore = create<ChatStore>()((set, get) => ({
  rooms: [],
  messages: {},
  isLoadingRooms: false,
  isLoadingMessages: false,

  loadRooms: async (userId) => {
    set({ isLoadingRooms: true });

    const { data: roomRows } = await supabase
      .from("chat_rooms")
      .select("room_id, user1_id, user2_id, created_at, last_message_at")
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("last_message_at", { ascending: false });

    if (!roomRows || roomRows.length === 0) {
      set({ rooms: [], isLoadingRooms: false });
      return;
    }

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

    const rooms: ChatRoom[] = roomRows.map((r) => ({
      room_id: r.room_id,
      user1_id: r.user1_id,
      user2_id: r.user2_id,
      created_at: r.created_at,
      last_message_at: r.last_message_at,
      other_user: buildOtherUser(r, userId, profilesById),
      last_message: lastMessageByRoom[r.room_id] ?? null,
    }));

    set({ rooms, isLoadingRooms: false });
  },

  loadMessages: async (roomId) => {
    set((state) => ({
      isLoadingMessages: true,
      messages: {
        ...state.messages,
        [roomId]: state.messages[roomId] ?? [],
      },
    }));

    const { data } = await supabase
      .from("chat_messages")
      .select("message_id, room_id, sender_id, text, created_at")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    set((state) => ({
      messages: { ...state.messages, [roomId]: (data as ChatMessage[]) ?? [] },
      isLoadingMessages: false,
    }));
  },

  sendMessage: async (roomId, senderId, text) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const { data: inserted } = await supabase
      .from("chat_messages")
      .insert({ room_id: roomId, sender_id: senderId, text: trimmedText })
      .select("message_id, room_id, sender_id, text, created_at")
      .single();

    if (!inserted) return;

    const newMessage = inserted as ChatMessage;

    await supabase
      .from("chat_rooms")
      .update({ last_message_at: newMessage.created_at })
      .eq("room_id", roomId);

    get().appendMessage(newMessage);
    get().updateRoomLastMessage(roomId, newMessage);
  },

  startConversation: async (currentUserId, otherUserId) => {
    const { data: existing } = await supabase
      .from("chat_rooms")
      .select("room_id")
      .or(
        `and(user1_id.eq.${currentUserId},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${currentUserId})`,
      )
      .maybeSingle();

    if (existing) return existing.room_id;

    const { data: created } = await supabase
      .from("chat_rooms")
      .insert({ user1_id: currentUserId, user2_id: otherUserId })
      .select("room_id, user1_id, user2_id, created_at, last_message_at")
      .single();

    if (!created) throw new Error("Failed to create chat room");

    const { data: profile } = await supabase
      .from("user_profile")
      .select("user_id, full_name, avatar")
      .eq("user_id", otherUserId)
      .single();

    const newRoom: ChatRoom = {
      room_id: created.room_id,
      user1_id: created.user1_id,
      user2_id: created.user2_id,
      created_at: created.created_at,
      last_message_at: created.last_message_at,
      other_user: profile
        ? {
            user_id: profile.user_id,
            full_name: profile.full_name,
            avatar: profile.avatar,
          }
        : { user_id: otherUserId, full_name: null, avatar: null },
      last_message: null,
    };

    set((state) => ({ rooms: [newRoom, ...state.rooms] }));
    return created.room_id;
  },

  appendMessage: (message) => {
    set((state) => {
      const existing = state.messages[message.room_id] ?? [];
      const alreadyExists = existing.some(
        (m) => m.message_id === message.message_id,
      );
      if (alreadyExists) return state;
      return {
        messages: {
          ...state.messages,
          [message.room_id]: [...existing, message],
        },
      };
    });
  },

  updateRoomLastMessage: (roomId, message) => {
    set((state) => ({
      rooms: state.rooms
        .map((room) =>
          room.room_id === roomId
            ? {
                ...room,
                last_message: message,
                last_message_at: message.created_at,
              }
            : room,
        )
        .sort(
          (a, b) =>
            new Date(b.last_message_at).getTime() -
            new Date(a.last_message_at).getTime(),
        ),
    }));
  },
}));
