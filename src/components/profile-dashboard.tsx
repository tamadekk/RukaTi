import ServicePerformance from "@/components/dashboard/profile/service-performance";
import QuickActions from "@/components/dashboard/profile/quick-actions";
import MainSection from "@/components/dashboard/main-section-dashboard";
import { useInitializeUser } from "@/hooks/init-userProfile";

export default function ProfileDashboard() {
  useInitializeUser();
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f8fa] md:flex-row">
      <main className="flex-1 p-2 sm:p-4 md:p-8 flex flex-col lg:flex-row gap-4 md:gap-6 mt-20 md:mt-0">
        <aside className="w-full flex flex-col gap-4 md:gap-6">
          <MainSection />
          <ServicePerformance />
          <QuickActions />
        </aside>
      </main>
    </div>
  );
}
