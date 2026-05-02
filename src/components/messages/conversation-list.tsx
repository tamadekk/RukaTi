import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatAvatar } from "@/components/messages/chat-avatar";
import type { ChatRoom } from "@/types/chat";

const formatTime = (iso: string): string => {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}d`;
};

type ConversationListProps = {
  rooms: ChatRoom[];
  activeRoomId?: string;
  isLoading?: boolean;
};

export const ConversationList = ({
  rooms,
  activeRoomId,
  isLoading = false,
}: ConversationListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-black shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <h1 className="text-sm font-black uppercase tracking-widest">
            Messages
          </h1>
          {rooms.length > 0 && (
            <span className="ml-auto text-[10px] font-bold bg-black text-white px-1.5 py-0.5">
              {rooms.length}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 border-b border-black"
            >
              <Skeleton className="w-9 h-9 rounded-none shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-2.5 w-24 rounded-none" />
                <Skeleton className="h-2 w-36 rounded-none" />
              </div>
            </div>
          ))
        ) : rooms.length === 0 ? (
          <div className="p-6 text-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              No conversations yet
            </p>
            <p className="text-[10px] font-mono text-neutral-300">
              Contact a provider to start chatting
            </p>
          </div>
        ) : (
          rooms.map((room) => {
            const otherUserName = room.other_user.full_name ?? "User";
            const initial = otherUserName.substring(0, 2).toUpperCase();
            const isActive = room.room_id === activeRoomId;

            return (
              <Link
                key={room.room_id}
                to="/messages"
                search={{ roomId: room.room_id }}
                className={`flex items-center gap-3 px-4 py-3 border-b border-black hover:bg-neutral-50 transition-colors ${
                  isActive ? "bg-black text-white hover:bg-black" : ""
                }`}
              >
                <ChatAvatar
                  src={room.other_user.avatar}
                  initial={initial}
                  className="w-9 h-9 rounded-none border border-black shrink-0"
                  fallbackClassName={`rounded-none text-[10px] font-bold ${isActive ? "bg-white text-black" : "bg-neutral-100"}`}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-tight truncate">
                      {otherUserName}
                    </span>
                    <span
                      className={`text-[9px] font-mono shrink-0 ${isActive ? "text-neutral-300" : "text-neutral-400"}`}
                    >
                      {formatTime(room.last_message_at)}
                    </span>
                  </div>
                  <p
                    className={`text-[10px] font-mono truncate ${isActive ? "text-neutral-300" : "text-neutral-500"}`}
                  >
                    {room.last_message
                      ? room.last_message.text
                      : "No messages yet"}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
