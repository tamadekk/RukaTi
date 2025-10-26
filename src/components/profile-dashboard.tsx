import Sidebar from "@/components/profile/sidebar";
import ProfileCard from "@/components/profile/profile-card";
import ServicesSection from "@/components/profile/services-section";
import ServicePerformance from "@/components/profile/service-performance";
import QuickActions from "@/components/profile/quick-actions";

const mockUser = {
  name: "Sophia Carter",
  location: "San Francisco, CA",
  description:
    "Experienced tutor specializing in math and science. Passionate about helping students achieve their academic goals.",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
};

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

export default function ProfileDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f8fa] md:flex-row">
      <Sidebar user={mockUser} />
      <main className="flex-1 p-2 sm:p-4 md:p-8 flex flex-col lg:flex-row gap-4 md:gap-6 mt-20 md:mt-0">
        <section className="flex-1 flex flex-col gap-4 md:gap-6">
          <ProfileCard user={mockUser} />
          <ServicesSection services={mockServices} />
        </section>
        <aside className="w-full lg:w-80 flex flex-col gap-4 md:gap-6">
          <ServicePerformance />
          <QuickActions />
        </aside>
      </main>
    </div>
  );
}
