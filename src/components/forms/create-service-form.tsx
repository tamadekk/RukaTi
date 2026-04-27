import { useState } from "react";
import { type UseFormReturn } from "react-hook-form";

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
import type { ServiceFormData } from "@/schemas/services";
import { LocationAutocomplete } from "@/components/forms/location-autocomplete";
import { ImageUpload } from "@/components/forms/image-upload";

type CreateServiceFormProps = {
  form: UseFormReturn<ServiceFormData>;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  loading: boolean;
};

export const CreateServiceForm = ({
  form,
  onSubmit,
  loading,
}: CreateServiceFormProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>(
    () => {
      const val = form.getValues("availability");
      if (val === "On call") return "on-call";
      if (val === "Mon–Fri") return "business";
      if (val && (val.includes(",") || AVAILABILITY_DAYS.includes(val)))
        return "custom";
      return "";
    },
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    const val = form.getValues("availability");
    if (val && (val.includes(",") || AVAILABILITY_DAYS.includes(val))) {
      return val.split(", ").filter((d) => AVAILABILITY_DAYS.includes(d));
    }
    return [];
  });
  const [isFixedPrice, setIsFixedPrice] = useState(() => {
    const val = form.getValues("price_range");
    return typeof val === "string" && val.startsWith("Fixed: €");
  });
  const [fixedPriceAmount, setFixedPriceAmount] = useState(() => {
    const val = form.getValues("price_range");
    if (typeof val === "string" && val.startsWith("Fixed: €")) {
      return val.replace("Fixed: €", "");
    }
    return "";
  });
  const [fixedPriceError, setFixedPriceError] = useState(false);

  const serviceImage = watch("service_image");
  const locationValue = watch("location");

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

  const handleFormSubmit = form.handleSubmit((data) => {
    if (isFixedPrice) {
      if (!fixedPriceAmount.trim()) {
        setFixedPriceError(true);
        return;
      }
      data.price_range = `Fixed: €${fixedPriceAmount}`;
    }
    onSubmit(data);
  });

  const handleRemoveImage = () => {
    setValue("service_image", [] as unknown as FileList);
  };

  const handleFixedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixedPriceAmount(e.target.value);
    setFixedPriceError(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("location", e.target.value);
  };

  const handleLocationSelect = (address: string) => {
    setValue("location", address);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 sm:space-y-6 font-mono"
    >
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
        <ImageUpload
          {...register("service_image")}
          imageFiles={serviceImage}
          onImageRemove={handleRemoveImage}
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                onChange={handleFixedPriceChange}
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
          <LocationAutocomplete
            {...register("location")}
            value={locationValue || ""}
            onChange={handleLocationChange}
            onSelectSuggestion={handleLocationSelect}
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
        className="w-full rounded-none border border-black bg-black text-white hover:bg-gray-900 h-14 sm:h-16 uppercase tracking-widest font-bold text-sm"
      >
        {loading ? "Submitting..." : "Submit Service"}
      </Button>
    </form>
  );
};
