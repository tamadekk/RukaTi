import { createFileRoute } from "@tanstack/react-router";
import { ProviderDetailsPage } from "@/pages/provider-details";

export const Route = createFileRoute("/provider/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProviderDetailsPage />;
}
