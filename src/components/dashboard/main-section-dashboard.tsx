import { useUserProfileStore } from "@/store/userProfileStore";
import ProfileCard from "./profile/profile-card";
import ServicesSection from "./profile/services-section";

const mockServices = [
  {
    title: "Math Tutoring",
    category: "Tutoring",
    description: "Offering math tutoring services for high school students.",
    image: "/src/assets/tutorTile.jpg",
  },
  {
    title: "Science Tutoring",
    category: "Tutoring",
    description: "Providing science tutoring for middle school students.",
    image: "/src/assets/tutorTile.jpg",
  },
];
const MainSection = () => {
  const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <section className="flex-1 flex flex-col gap-4 md:gap-6">
      <ProfileCard user={userProfile} />
      <ServicesSection services={mockServices} />
    </section>
  );
};

export default MainSection;
