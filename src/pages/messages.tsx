import { useSearch } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { useUserSession } from "@/store/userSessionsStore";
import { ConversationList } from "@/components/messages/conversation-list";
import { ChatWindow } from "@/components/messages/chat-window";

export function MessagesPage() {
  const { roomId } = useSearch({ from: "/_authenticated/messages" });
  const { user } = useUserSession();
  const rooms = useChatStore((s) => s.rooms);

  const activeRoom = roomId ? rooms.find((r) => r.room_id === roomId) : null;

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
              currentUserId={user?.id ?? ""}
              showBackButton
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
