export type ChatMessage = {
  message_id: string;
  room_id: string;
  sender_id: string;
  text: string;
  created_at: string;
};

export type ChatRoom = {
  room_id: string;
  provider_id: string;
  provider_name: string;
  provider_avatar: string | null;
  messages: ChatMessage[];
  created_at: string;
  last_message_at: string;
};
