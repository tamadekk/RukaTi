import z from "zod";

export const OnboardingSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be at most 80 characters"),
  phone_number: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long")
    .regex(
      /^\+?[0-9\s\-().]+$/,
      "Phone number can only contain digits, spaces, +, -, (, )",
    ),
  bio: z.string().max(300, "Bio must be at most 300 characters").optional(),
});

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;
