import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, ChatRoom } from "@/types/chat";

type StartConversationParams = {
  provider_id: string;
  provider_name: string;
  provider_avatar: string | null;
};

type ChatStore = {
  rooms: ChatRoom[];
  startConversation: (params: StartConversationParams) => string;
  sendMessage: (roomId: string, senderId: string, text: string) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      rooms: [],

      startConversation: ({ provider_id, provider_name, provider_avatar }) => {
        const existing = get().rooms.find((r) => r.provider_id === provider_id);
        if (existing) return existing.room_id;

        const now = new Date().toISOString();
        const room: ChatRoom = {
          room_id: crypto.randomUUID(),
          provider_id,
          provider_name,
          provider_avatar,
          messages: [],
          created_at: now,
          last_message_at: now,
        };
        set((state) => ({ rooms: [room, ...state.rooms] }));
        return room.room_id;
      },

      sendMessage: (roomId, senderId, text) => {
        const message: ChatMessage = {
          message_id: crypto.randomUUID(),
          room_id: roomId,
          sender_id: senderId,
          text: text.trim(),
          created_at: new Date().toISOString(),
        };
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.room_id === roomId
              ? {
                  ...room,
                  messages: [...room.messages, message],
                  last_message_at: message.created_at,
                }
              : room,
          ),
        }));
      },
    }),
    { name: "rukati_chats" },
  ),
);
