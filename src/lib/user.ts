import { useServiceStore } from "@/store/userServicesStore";
import supabase from "@/supabase-client";
import type { UserServices, UserProfile } from "@/types/user";
import { useUserSession } from "@/store/userSessionsStore";
import { uploadImage } from "@/lib/storage";

export const isUserOnboarded = (
  profile: UserProfile | null | undefined,
): boolean => {
  if (profile) {
    return profile.profile_completed;
  }
  return false;
};

export const getUserServices = async (userId: string) => {
  const { setUserServices } = useServiceStore.getState();
  const { data, error } = await supabase
    .from("user_service")
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

  const avatarUrl = await uploadImage({
    file,
    bucket: "user_avatars",
    folderPath: "avatars",
    fileNamePrefix: user.id,
  });

  const { error: updateError } = await supabase
    .from("user_profile")
    .update({ avatar: avatarUrl })
    .eq("user_id", user.id);

  if (updateError) throw updateError;
  // TODO: update user profile in store ??
  return avatarUrl;
}
