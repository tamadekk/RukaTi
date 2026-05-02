import { useState } from "react";
import ServicePerformance from "@/components/dashboard/profile/service-performance";
import QuickActions from "@/components/dashboard/profile/quick-actions";
import ProfileCard from "@/components/dashboard/profile/profile-card";
import ServicesSection from "@/components/dashboard/profile/services-section";
import RecentActivity from "@/components/dashboard/profile/recent-activity";
import { CreateServiceModal } from "@/components/dashboard/create-service-modal";
import { useUserProfile } from "@/hooks/useUserProfileQuery";
import { useUserSession } from "@/store/userSessionsStore";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function ProfileDashboard() {
  const { user } = useUserSession();
  const { data: userProfile } = useUserProfile(user?.id);
  const userRating = userProfile?.rating || 0;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <DashboardLayout
        sidebar={
          <>
            <ProfileCard user={userProfile ?? null} />
            <QuickActions />
          </>
        }
      >
        <ServicePerformance rating={userRating} />
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
