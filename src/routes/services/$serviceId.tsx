import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailsPage } from "@/pages/service-details";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetailsPage,
});
