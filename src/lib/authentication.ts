import supabase from "@/supabase-client";
import { useUserSession } from "@/store/userSessionsStore";

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  const { logout } = useUserSession.getState();
  logout();
  return error;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
};

export const signIn = async (creds: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword(creds);

  return { data, error };
};
