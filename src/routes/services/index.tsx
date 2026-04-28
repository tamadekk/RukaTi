import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ServicesPage } from "@/pages/services";

export const Route = createFileRoute("/services/")({
  validateSearch: z.object({ category: z.string().optional() }),
  component: ServicesPage,
});
