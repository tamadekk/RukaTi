import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { categories } from "@/const/categories-section";

import { ServiceSchema, type ServiceFormData } from "@/schemas/services";

type CreateServiceFormProps = {
  onSubmit: SubmitHandler<ServiceFormData>;
  loading: boolean;
  defaultValues?: Partial<ServiceFormData>;
};

export const CreateServiceForm = ({
  onSubmit,
  loading,
  defaultValues,
}: CreateServiceFormProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(ServiceSchema),
    defaultValues,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // Merge the ref from register with our local ref if needed,
  // but simpler to just use the register props spreading
  const { ref: fileRef, ...fileRest } = register("service_image");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-mono">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider">
          Service Title
        </label>
        <Input
          {...register("title")}
          placeholder="E.G. PROFESSIONAL WEB DESIGN"
          className={`rounded-none border-black h-12 ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider">
          Description
        </label>
        <Textarea
          {...register("description")}
          placeholder="DESCRIBE YOUR SERVICE IN DETAIL..."
          className={`rounded-none border-black min-h-[120px] resize-none p-4 ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>

      {/* Image Upload - Custom UI */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider">
          Service Image
        </label>
        <div className="relative group cursor-pointer">
          <Input
            type="file"
            id="service-image-upload"
            className="hidden"
            {...fileRest}
            ref={(e) => {
              fileRef(e);
            }}
            onChange={(e) => {
              fileRest.onChange(e); // call react-hook-form's onChange
              handleFileChange(e); // call our local one
            }}
          />
          <label
            htmlFor="service-image-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-black bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="w-8 h-8 text-gray-400" />
              <span className="text-xs font-bold uppercase text-gray-500">
                {fileName ? fileName : "Click to Upload Image"}
              </span>
              <span className="text-[10px] text-gray-400">
                JPG, PNG, WEBP UP TO 5MB
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Grid Layout for details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Category
          </label>
          <select
            {...register("category")}
            className={`w-full rounded-none border border-black h-12 px-3 bg-white ${
              errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              SELECT A CATEGORY
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs">{errors.category.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Price Range
          </label>
          <Input
            {...register("price_range")}
            placeholder="E.G. $50 - $100 / HR"
            className="rounded-none border-black h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Availability
          </label>
          <Input
            {...register("availability")}
            placeholder="E.G. WEEKENDS"
            className="rounded-none border-black h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Location
          </label>
          <Input
            {...register("location")}
            placeholder="OPTIONAL"
            className="rounded-none border-black h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider">
          Contact Info
        </label>
        <Input
          {...register("contact")}
          placeholder="OPTIONAL"
          className="rounded-none border-black h-12"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading || isSubmitting}
        className="w-full rounded-none border border-black bg-black text-white hover:bg-gray-900 h-14 uppercase tracking-widest font-bold text-sm"
      >
        {loading ? "Submitting..." : "Submit Service"}
      </Button>
    </form>
  );
};
