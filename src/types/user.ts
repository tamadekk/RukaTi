import type { User } from "@supabase/supabase-js";

export type UserProfile = {
  user_id: string;
  email: string;
  phone_number: string;
  role: string;
  rating: number | null;
  profile_image_url: string | null;
  bio: string | null;
  created_at: Date | string | null;
};
export type { User };
