import type { User } from "@supabase/supabase-js";

export type UserProfile = {
  user_id: string;
  email: string;
  phone_number: string;
  role: string;
  rating: number | null;
  avatar: string | null;
  bio: string | null;
  created_at: Date | string | null;
};
export type { User };

export type UserServices = {
  service_id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contact: string;
  price_range: string;
  availability: string;
  rating: number;
  created_at: string | Date;
  service_image?: string | null;
};

export type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string | Date;
  reviewer_avatar?: string;
};
