import z from "zod";

export const ServiceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  location: z.string().optional(),
  contact: z.string().optional(),
  price_range: z.string().optional(),
  availability: z.string().optional(),
  service_image: z.any().optional(),
});

export type ServiceFormData = z.infer<typeof ServiceSchema>;
