import CreateServicePage from "@/pages/create-service";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/create-service")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateServicePage />;
}
