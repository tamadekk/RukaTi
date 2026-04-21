import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/const/categories-section";
import {
  PRICE_RANGES,
  AVAILABILITY_DAYS,
  AVAILABILITY_OPTIONS,
  type AvailabilityType,
} from "@/const/services";
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
  const [availabilityType, setAvailabilityType] =
    useState<AvailabilityType>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isFixedPrice, setIsFixedPrice] = useState(false);
  const [fixedPriceAmount, setFixedPriceAmount] = useState("");
  const [fixedPriceError, setFixedPriceError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(ServiceSchema),
    defaultValues,
  });

  const availabilityValue = (type: AvailabilityType, days: string[]) => {
    if (type === "on-call") return "On call";
    if (type === "business") return "Mon–Fri";
    if (type === "custom") return days.join(", ");
    return "";
  };

  const handleAvailabilityTypeChange = (type: AvailabilityType) => {
    setAvailabilityType(type);
    setValue("availability", availabilityValue(type, selectedDays));
  };

  const toggleDay = (day: string) => {
    const next = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(next);
    setValue("availability", availabilityValue("custom", next));
  };

  const { onChange: onPriceRangeChange, ...priceRangeRest } =
    register("price_range");

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPriceRangeChange(e);
    const fixed = e.target.value === "Fixed Price";
    setIsFixedPrice(fixed);
    if (!fixed) {
      setFixedPriceAmount("");
      setFixedPriceError(false);
    }
  };

  const handleFormSubmit = handleSubmit((data) => {
    if (isFixedPrice) {
      if (!fixedPriceAmount.trim()) {
        setFixedPriceError(true);
        return;
      }
      data.price_range = `Fixed: €${fixedPriceAmount}`;
    }
    onSubmit(data);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 font-mono">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider">
          Service Title <span className="text-red-500">*</span>
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
          Description <span className="text-red-500">*</span>
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

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider">
          Service Image{" "}
          <span className="text-[10px] font-normal text-muted-foreground normal-case tracking-normal">
            (optional)
          </span>
        </label>
        <div className="relative group cursor-pointer">
          <Input
            type="file"
            id="service-image-upload"
            className="hidden"
            accept="image/*"
            {...register("service_image")}
          />
          <label
            htmlFor="service-image-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-black bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="w-8 h-8 text-gray-400" />
              <span className="text-xs font-bold uppercase text-gray-500">
                Click to Upload Image
              </span>
              <span className="text-[10px] text-gray-400">
                JPG, PNG, WEBP UP TO 5MB
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Category <span className="text-red-500">*</span>
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

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Price Range <span className="text-red-500">*</span>
          </label>
          <select
            {...priceRangeRest}
            onChange={handlePriceRangeChange}
            className={`w-full rounded-none border border-black h-12 px-3 bg-white ${
              errors.price_range ? "border-red-500" : ""
            }`}
          >
            <option value="">SELECT A RANGE</option>
            {PRICE_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.price_range && !isFixedPrice && (
            <p className="text-red-500 text-xs">{errors.price_range.message}</p>
          )}

          {isFixedPrice && (
            <div className="space-y-1">
              <Input
                type="number"
                min={0}
                placeholder="ENTER AMOUNT (€)"
                value={fixedPriceAmount}
                onChange={(e) => {
                  setFixedPriceAmount(e.target.value);
                  setFixedPriceError(false);
                }}
                className={`rounded-none border-black h-12 ${fixedPriceError ? "border-red-500" : ""}`}
              />
              {fixedPriceError && (
                <p className="text-red-500 text-xs">Enter the fixed price.</p>
              )}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Location{" "}
            <span className="text-[10px] font-normal text-muted-foreground normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <Input
            {...register("location")}
            placeholder="E.G. HELSINKI"
            className="rounded-none border-black h-12"
          />
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider">
            Contact Info{" "}
            <span className="text-[10px] font-normal text-muted-foreground normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <Input
            {...register("contact")}
            placeholder="E.G. EMAIL OR PHONE"
            className="rounded-none border-black h-12"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider">
          Availability <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleAvailabilityTypeChange(opt.value)}
              className={`px-4 h-10 text-xs font-bold uppercase tracking-wider border-2 transition-colors ${
                availabilityType === opt.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-neutral-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {availabilityType === "custom" && (
          <div className="flex gap-2 flex-wrap">
            {AVAILABILITY_DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`w-12 h-10 text-xs font-bold uppercase border-2 transition-colors ${
                  selectedDays.includes(day)
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black hover:bg-neutral-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        )}

        {errors.availability && (
          <p className="text-red-500 text-xs">
            {availabilityType === "custom"
              ? "Select at least one day."
              : "Availability is required."}
          </p>
        )}
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
