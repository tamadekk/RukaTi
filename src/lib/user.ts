import supabase from "@/supabase-client";
import type { UserProfile } from "@/types/user";
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
  return avatarUrl;
}
