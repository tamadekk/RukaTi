import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ChatMessage, ChatRoom } from "@/types/chat";

type ChatWindowProps = {
  room: ChatRoom;
  messages: ChatMessage[];
  currentUserId: string;
  showBackButton?: boolean;
  onSend: (text: string) => void;
};

export const ChatWindow = ({
  room,
  messages,
  currentUserId,
  showBackButton = false,
  onSend,
}: ChatWindowProps) => {
  const [draft, setDraft] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [room.room_id]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    onSend(text);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const otherUserName = room.other_user.full_name ?? "User";
  const initial = otherUserName.substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-black shrink-0 bg-white">
        {showBackButton && (
          <Link
            to="/messages"
            className="mr-1 p-1 hover:bg-neutral-100 transition-colors"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
        <Avatar className="w-9 h-9 rounded-none border border-black shrink-0">
          <AvatarImage
            src={room.other_user.avatar ?? undefined}
            className="object-cover"
          />
          <AvatarFallback className="rounded-none bg-neutral-100 text-[10px] font-bold">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[11px] font-black uppercase tracking-tight">
            {otherUserName}
          </p>
          <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
            Service Provider
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-12">
            <div className="w-12 h-12 border-2 border-black flex items-center justify-center">
              <span className="text-lg font-black">{initial}</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Start the conversation
            </p>
            <p className="text-[10px] font-mono text-neutral-300 text-center max-w-xs">
              Introduce yourself and describe what you're looking for
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOwn = msg.sender_id === currentUserId;
            const nextMessage = messages[index + 1];
            const isLastInGroup =
              !nextMessage || nextMessage.sender_id !== msg.sender_id;
            return (
              <div
                key={msg.message_id}
                className={`flex gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
              >
                {!isOwn &&
                  (isLastInGroup ? (
                    <Avatar className="w-7 h-7 rounded-none border border-black shrink-0 self-end">
                      <AvatarImage
                        src={room.other_user.avatar ?? undefined}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-none bg-neutral-100 text-[9px] font-bold">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-7 shrink-0" />
                  ))}
                <div
                  className={`max-w-[70%] px-3 py-2 text-[11px] font-mono leading-relaxed border border-black ${
                    isOwn ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-black bg-white flex items-center gap-0">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 text-sm font-mono bg-transparent outline-none placeholder:text-neutral-300"
        />
        <button
          onClick={handleSend}
          disabled={!draft.trim()}
          className="h-full px-4 py-3 border-l border-black bg-black text-white hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
