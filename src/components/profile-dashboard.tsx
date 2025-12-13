import ServicePerformance from "@/components/dashboard/profile/service-performance";
import QuickActions from "@/components/dashboard/profile/quick-actions";
import ProfileCard from "@/components/dashboard/profile/profile-card";
import ServicesSection from "@/components/dashboard/profile/services-section";
import { useInitializeUser } from "@/hooks/init-userProfile";
import { useUserProfileStore } from "@/store/userProfileStore";

export default function ProfileDashboard() {
  useInitializeUser();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <div className="min-h-screen bg-background font-mono">
      <div className="max-w-7xl mx-auto border-x border-black bg-black gap-[1px] grid grid-cols-1 lg:grid-cols-12">
        {/* Top Left: Profile - Spans 8 cols */}
        <div className="lg:col-span-8 bg-background p-6">
          <ProfileCard user={userProfile} />
        </div>

        {/* Top Right: Performance - Spans 4 cols */}
        <div className="lg:col-span-4 bg-background p-6">
          <ServicePerformance />
        </div>

        {/* Bottom Left: Services - Spans 8 cols */}
        <div className="lg:col-span-8 bg-background p-6">
          <ServicesSection />
        </div>

        {/* Bottom Right: Actions - Spans 4 cols */}
        <div className="lg:col-span-4 bg-background p-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
