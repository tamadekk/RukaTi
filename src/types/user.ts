import type { User } from "@supabase/supabase-js";

export type UserProfile = {
  user_id: string;
  email: string;
  full_name: string | null;
  phone_number: string;
  role: string;
  rating: number | null;
  avatar: string | null;
  bio: string | null;
  created_at: Date | string | null;
};
export type { User };

// TODO: create ENUM for categories
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
  review_id: string;
  user_id: string;
  service_id: string;
  review_rating: number;
  review_text: string;
  created_at: string | Date;
  user_profiles: {
    full_name: string;
    avatar: string;
  };
};

export type UploadReview = Omit<Review, "user_profiles">;
