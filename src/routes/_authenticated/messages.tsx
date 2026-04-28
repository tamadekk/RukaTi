import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { MessagesPage } from "@/pages/messages";

export const Route = createFileRoute("/_authenticated/messages")({
  validateSearch: z.object({ roomId: z.string().optional() }),
  component: MessagesPage,
});
