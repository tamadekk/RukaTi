import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import MyServicesPage from "@/pages/my-services";

export const Route = createFileRoute("/_authenticated/my-services")({
  validateSearch: z.object({ create: z.boolean().optional() }),
  component: MyServicesPage,
});
