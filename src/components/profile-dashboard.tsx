import ServicePerformance from "@/components/dashboard/profile/service-performance";
import QuickActions from "@/components/dashboard/profile/quick-actions";
import ProfileCard from "@/components/dashboard/profile/profile-card";
import ServicesSection from "@/components/dashboard/profile/services-section";
import RecentActivity from "@/components/dashboard/profile/recent-activity";
import { useInitializeUser } from "@/hooks/init-userProfile";
import { useUserProfileStore } from "@/store/userProfileStore";

export default function ProfileDashboard() {
  useInitializeUser();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <div className="min-h-screen bg-background font-mono">
      <div className="max-w-7xl mx-auto border-x border-black bg-black gap-[1px] grid grid-cols-1 lg:grid-cols-12">
        {/* Sidebar - Spans 3 cols */}
        <div className="lg:col-span-3 bg-background p-6 flex flex-col gap-6">
          <ProfileCard user={userProfile} />
          <QuickActions />
        </div>

        {/* Main Content - Spans 9 cols */}
        <div className="lg:col-span-9 bg-background p-6 flex flex-col gap-8">
          <ServicePerformance />
          <ServicesSection />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
