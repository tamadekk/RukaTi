import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/hero-section";
import CategoriesSection from "@/components/categories-section";
import HowItWorksSection from "@/components/how-it-works-section";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
    </>
  );
}
