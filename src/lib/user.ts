import { useUserServices } from "@/store/userServicesStore";
// import { useUserProfileStore } from "@/store/userProfileStore";
import supabase from "@/supabase-client";
import type { UserServices } from "@/types/user";
import { useUserSession } from "@/store/userSessionsStore";

export const getUserServices = async (userId: string) => {
  const { setUserServices } = useUserServices.getState();
  const { data, error } = await supabase
    .from("user_services")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user services:", error);
    return [];
  }
  if (data) {
    console.log("Fetched user services:", data);
    setUserServices(data);
  }

  return data as UserServices[];
};

export async function uploadAvatar(file: File) {
  const user = useUserSession.getState().user;
  if (!user) throw new Error("Not authenticated");

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("user_avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  // Get public URL
  const { data } = supabase.storage.from("user_avatars").getPublicUrl(filePath);
  const avatarUrl = data.publicUrl;

  // Update user profile
  const { error: updateError } = await supabase
    .from("user_profiles")
    .update({ avatar: avatarUrl })
    .eq("user_id", user.id);

  if (updateError) throw updateError;

  // Update local store
  // useUserProfileStore.getState().setUserProfile({ avatar_url: avatarUrl });

  return avatarUrl;
}
