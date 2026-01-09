import { createFileRoute } from "@tanstack/react-router";
import MyServicesPage from "@/pages/my-services";

export const Route = createFileRoute("/_authenticated/my-services")({
  component: MyServicesPage,
});
