import { useEffect } from "react";
import { useSearch } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { useUserSession } from "@/store/userSessionsStore";
import { ConversationList } from "@/components/messages/conversation-list";
import { ChatWindow } from "@/components/messages/chat-window";
import supabase from "@/supabase-client";
import type { ChatMessage } from "@/types/chat";

const EMPTY_MESSAGES: ChatMessage[] = [];

export function MessagesPage() {
  const { roomId } = useSearch({ from: "/_authenticated/messages" });
  const { user } = useUserSession();
  const rooms = useChatStore((s) => s.rooms);
  const loadRooms = useChatStore((s) => s.loadRooms);
  const loadMessages = useChatStore((s) => s.loadMessages);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const appendMessage = useChatStore((s) => s.appendMessage);
  const activeRoomMessages = useChatStore(
    (s) => (roomId ? s.messages[roomId] : undefined) ?? EMPTY_MESSAGES,
  );

  useEffect(() => {
    if (!user?.id) return;

    loadRooms(user.id);

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
        () => loadRooms(user.id),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_rooms",
          filter: `user2_id=eq.${user.id}`,
        },
        () => loadRooms(user.id),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, loadRooms]);

  useEffect(() => {
    if (!roomId) return;

    loadMessages(roomId);

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
        (payload) => appendMessage(payload.new as ChatMessage),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, loadMessages, appendMessage]);

  const activeRoom = roomId ? rooms.find((r) => r.room_id === roomId) : null;

  const handleSend = (text: string) => {
    if (!activeRoom || !user?.id) return;
    sendMessage(activeRoom.room_id, user.id, text);
  };

  return (
    <div className="fixed inset-x-0 top-16 bottom-16 md:bottom-0 bg-background font-mono z-40">
      <div className="max-w-7xl mx-auto border-x border-black flex h-full">
        {/* Conversation list — hidden on mobile when a room is open */}
        <div
          className={`border-r border-black flex flex-col w-full md:w-72 shrink-0 ${
            activeRoom ? "hidden md:flex" : "flex"
          }`}
        >
          <ConversationList rooms={rooms} activeRoomId={roomId} />
        </div>

        {/* Chat area */}
        <div
          className={`flex-1 flex flex-col ${activeRoom ? "flex" : "hidden md:flex"}`}
        >
          {activeRoom ? (
            <ChatWindow
              room={activeRoom}
              messages={activeRoomMessages}
              currentUserId={user?.id ?? ""}
              showBackButton
              onSend={handleSend}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest">
                  Select a conversation
                </p>
                <p className="text-xs font-mono text-neutral-400">
                  Choose a chat from the left or contact a provider
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
