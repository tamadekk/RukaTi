export type ChatMessage = {
  message_id: string;
  room_id: string;
  sender_id: string;
  text: string;
  created_at: string;
};

export type ChatRoomParticipant = {
  user_id: string;
  full_name: string | null;
  avatar: string | null;
};

export type ChatRoom = {
  room_id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  last_message_at: string;
  other_user: ChatRoomParticipant;
  last_message: ChatMessage | null;
};
