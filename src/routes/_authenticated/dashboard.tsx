import { createFileRoute } from "@tanstack/react-router";
import ProfileDashboard from "@/components/profile-dashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: ProfileDashboard,
});
