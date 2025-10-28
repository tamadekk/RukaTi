import { useUserServices } from "@/store/userServicesStore";
import supabase from "@/supabase-client";
import type { UserServices } from "@/types/user";

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
