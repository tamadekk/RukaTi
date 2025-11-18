import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ServiceSchema, type ServiceFormData } from "@/schemas/services";

type CreateServiceFormProps = {
  onSubmit: SubmitHandler<ServiceFormData>;
  loading: boolean;
};

export const CreateServiceForm = ({
  onSubmit,
  loading,
}: CreateServiceFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(ServiceSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Service Title</label>
        <Input
          {...register("title")}
          placeholder="e.g. Web Design"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          {...register("description")}
          placeholder="Describe what you offer..."
          className={`min-h-[120px] ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Category</label>
        <Input
          {...register("category")}
          placeholder="e.g. Tutor"
          className={errors.category ? "border-red-500" : ""}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Optional Fields */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Location</label>
        <Input {...register("location")} placeholder="Optional" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Contact</label>
        <Input {...register("contact")} placeholder="Optional" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Price Range</label>
        <Input {...register("price_range")} placeholder="e.g. $50/hr" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Availability</label>
        <Input {...register("availability")} placeholder="e.g. Weekends" />
      </div>

      {/* Image Upload */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Service Image</label>
        <Input type="file" {...register("service_image")} />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl py-5 text-md"
      >
        {loading ? "Submitting..." : "Submit Service"}
      </Button>
    </form>
  );
};
