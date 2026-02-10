import { z } from "zod";

export const userServiceReviewSchema = z.object({
  review_rating: z.number().int().min(1).max(5),
  review_text: z.string().nullable().optional(),
});

export type UserServiceReview = z.infer<typeof userServiceReviewSchema>;
