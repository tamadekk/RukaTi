import { useUserProfileStore } from "@/store/userProfileStore";
import ProfileCard from "./profile/profile-card";
import ServicesSection from "./profile/services-section";

const MainSection = () => {
  const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <section className="flex-1 flex flex-col gap-4 md:gap-6">
      <ProfileCard user={userProfile} />
      <ServicesSection />
    </section>
  );
};

export default MainSection;
