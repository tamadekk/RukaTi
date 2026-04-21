import z from "zod";

export const ServiceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  location: z.string().optional(),
  contact: z.string().optional(),
  price_range: z.string().min(1, "Price range is required"),
  availability: z.string().min(1, "Availability is required"),
  service_image: z.any().optional(),
});

export type ServiceFormData = z.infer<typeof ServiceSchema>;
