import { useState } from "react";
import ServicePerformance from "@/components/dashboard/profile/service-performance";
import QuickActions from "@/components/dashboard/profile/quick-actions";
import ProfileCard from "@/components/dashboard/profile/profile-card";
import ServicesSection from "@/components/dashboard/profile/services-section";
import RecentActivity from "@/components/dashboard/profile/recent-activity";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { useInitializeUser } from "@/hooks/init-userProfile";
import { useUserProfileStore } from "@/store/userProfileStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function ProfileDashboard() {
  useInitializeUser();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <DashboardLayout
        sidebar={
          <>
            <ProfileCard user={userProfile} />
            <QuickActions />
          </>
        }
      >
        <ServicePerformance />
        <ServicesSection onAddServiceClick={() => setIsCreateModalOpen(true)} />
        <RecentActivity />
      </DashboardLayout>

      <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
