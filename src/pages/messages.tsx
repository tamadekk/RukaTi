import { useEffect } from "react";
import { useSearch } from "@tanstack/react-router";
import { useUserSession } from "@/store/userSessionsStore";
import { ConversationList } from "@/components/messages/conversation-list";
import { ChatWindow } from "@/components/messages/chat-window";
import { EmptyConversationState } from "@/components/messages/empty-conversation-state";
import supabase from "@/supabase-client";
import type { ChatMessage } from "@/types/chat";
import {
  useChatRooms,
  useChatMessages,
  useSendMessage,
  appendMessageToCache,
} from "@/hooks/useChatQuery";
import { queryClient } from "@/lib/queryClient";
import { queryKeys } from "@/lib/queryKeys";

const EMPTY_MESSAGES: ChatMessage[] = [];

export function MessagesPage() {
  const { roomId } = useSearch({ from: "/_authenticated/messages" });
  const { user } = useUserSession();
  const { data: rooms = [], isLoading: isLoadingRooms } = useChatRooms(
    user?.id,
  );
  const {
    data: activeRoomMessages = EMPTY_MESSAGES,
    isLoading: isLoadingMessages,
  } = useChatMessages(roomId);
  const { mutate: sendMessageMutation } = useSendMessage(user?.id);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`rooms:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_rooms",
          filter: `user1_id=eq.${user.id}`,
        },
        () =>
          queryClient.invalidateQueries({
            queryKey: queryKeys.chatRooms(user.id),
          }),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_rooms",
          filter: `user2_id=eq.${user.id}`,
        },
        () =>
          queryClient.invalidateQueries({
            queryKey: queryKeys.chatRooms(user.id),
          }),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => appendMessageToCache(roomId, payload.new as ChatMessage),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const activeRoom = roomId ? rooms.find((r) => r.room_id === roomId) : null;

  const handleSend = (text: string) => {
    if (!activeRoom || !user?.id) return;
    sendMessageMutation({
      roomId: activeRoom.room_id,
      senderId: user.id,
      text,
    });
  };

  return (
    <div className="fixed inset-x-0 top-16 bottom-16 md:bottom-0 bg-background font-mono z-40">
      <div className="max-w-7xl mx-auto border-x border-black flex h-full">
        <div
          className={`border-r border-black flex-col w-full md:w-72 shrink-0 ${activeRoom ? "hidden md:flex" : "flex"}`}
        >
          <ConversationList
            rooms={rooms}
            activeRoomId={roomId}
            isLoading={isLoadingRooms}
          />
        </div>
        <div
          className={`flex-1 flex-col ${activeRoom ? "flex" : "hidden md:flex"}`}
        >
          {activeRoom ? (
            <ChatWindow
              room={activeRoom}
              messages={activeRoomMessages}
              currentUserId={user?.id ?? ""}
              showBackButton
              isLoading={isLoadingMessages}
              onSend={handleSend}
            />
          ) : (
            <EmptyConversationState />
          )}
        </div>
      </div>
    </div>
  );
}
