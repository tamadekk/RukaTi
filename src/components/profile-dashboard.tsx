import { useEffect } from "react";
import Sidebar from "@/components/dashboard/profile/sidebar";
import ServicePerformance from "@/components/dashboard/profile/service-performance";
import QuickActions from "@/components/dashboard/profile/quick-actions";
import { useUserProfileStore } from "@/store/userProfileStore";
import type { UserProfile } from "@/types/user";
import MainSection from "./dashboard/main-section-dashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const mockUser: UserProfile = {
  user_id: "1",
  email: "user@gmail.com",
  phone_number: "123-456-7890",
  role: "tutor",
  rating: 4.8,
  profile_image_url: null,
  bio: "Passionate tutor with 5 years of experience.",
  created_at: new Date().toISOString(),
};

export default function ProfileDashboard() {
  console.log("Rendering ProfileDashboard");
  //TODO: remove mock data and fetch real user profile data
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    setUserProfile(mockUser);
  }, [setUserProfile]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f8fa] md:flex-row">
      <SidebarProvider>
        <Sidebar />
        <SidebarTrigger />
        <main className="flex-1 p-2 sm:p-4 md:p-8 flex flex-col lg:flex-row gap-4 md:gap-6 mt-20 md:mt-0">
          <aside className="w-full flex flex-col gap-4 md:gap-6">
            <MainSection userProfile={userProfile} />
            <ServicePerformance />
            <QuickActions />
          </aside>
        </main>
      </SidebarProvider>
    </div>
  );
}
