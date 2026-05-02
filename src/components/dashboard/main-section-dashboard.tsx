import { useUserProfile } from "@/hooks/useUserProfileQuery";
import { useUserSession } from "@/store/userSessionsStore";
import ProfileCard from "@/components/dashboard/profile/profile-card";
import ServicesSection from "@/components/dashboard/profile/services-section";

const MainSection = () => {
  const { user } = useUserSession();
  const { data: userProfile } = useUserProfile(user?.id);

  return (
    <section className="flex-1 flex flex-col gap-4 md:gap-6">
      <ProfileCard user={userProfile ?? null} />
      <ServicesSection />
    </section>
  );
};

export default MainSection;
