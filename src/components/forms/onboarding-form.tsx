import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  User as UserIcon,
  Phone,
  FileText,
  ArrowRight,
  Camera,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserProfileStore } from "@/store/userProfileStore";
import { uploadImage } from "@/lib/storage";
import {
  OnboardingSchema,
  type OnboardingFormData,
} from "@/schemas/user-profile";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function OnboardingForm() {
  const navigate = useNavigate();
  const {
    userProfile,
    updateUserProfile,
    loading: storeLoading,
  } = useUserProfileStore();
  const [isUploading, setIsUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      bio: "",
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }

    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
  };

  const removeAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: OnboardingFormData) => {
    if (!userProfile?.user_id) {
      toast.error("User session not found.");
      return;
    }

    setIsUploading(true);
    try {
      let avatarUrl = null;

      if (avatarFile) {
        avatarUrl = await uploadImage({
          file: avatarFile,
          bucket: "user_avatars",
          folderPath: userProfile.user_id,
          fileNamePrefix: userProfile.user_id,
        });
      }

      await updateUserProfile({
        full_name: data.full_name,
        phone_number: data.phone_number,
        bio: data.bio ?? null,
        avatar: avatarUrl,
        profile_completed: true,
      });

      toast.success("Profile set up! Welcome aboard 🎉");
      navigate({ to: "/" });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const loading = storeLoading || isUploading;

  return (
    <div className="w-full max-w-xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="space-y-3 border-b-2 border-black pb-8">
        <div className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 mb-2">
          Step 1 of 1
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
          Complete Your Profile
        </h1>
        <p className="text-base text-muted-foreground">
          Help the community get to know you — it only takes a minute.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-4">
          <label className="text-sm font-bold uppercase tracking-widest self-start">
            Profile Picture
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative w-32 h-32 cursor-pointer transition-transform hover:scale-105"
          >
            <div className="w-full h-full rounded-full border-4 border-black bg-neutral-100 flex items-center justify-center overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-active:shadow-none group-active:translate-x-1 group-active:translate-y-1 transition-all">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-10 h-10 text-neutral-400 group-hover:text-black transition-colors" />
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-white text-[10px] font-bold uppercase tracking-wider">
                  Change
                </p>
              </div>
            </div>

            {avatarFile && (
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute -top-1 -right-1 bg-white border-2 border-black rounded-full p-1 hover:bg-neutral-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            JPG, PNG (Max 5MB)
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("full_name")}
            placeholder="e.g. Jane Smith"
            className="rounded-none border-2 border-black h-14 text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
          />
          {errors.full_name && (
            <p className="text-sm text-red-600 font-medium">
              {errors.full_name.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("phone_number")}
            placeholder="e.g. +358 40 123 4567"
            type="tel"
            className="rounded-none border-2 border-black h-14 text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
          />
          {errors.phone_number && (
            <p className="text-sm text-red-600 font-medium">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <FileText className="h-4 w-4" />
            About You{" "}
            <span className="text-[10px] font-normal text-muted-foreground normal-case tracking-normal">
              (optional)
            </span>
          </label>
          <Textarea
            {...register("bio")}
            placeholder="Tell the community a bit about yourself and your skills..."
            className="rounded-none border-2 border-black min-h-[140px] text-base focus-visible:ring-0 focus-visible:ring-offset-0 p-4 resize-none"
          />
          {errors.bio && (
            <p className="text-sm text-red-600 font-medium">
              {errors.bio.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-none bg-black text-white hover:bg-neutral-800 uppercase font-bold tracking-[0.2em] h-16 text-lg flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-[-3px] active:translate-y-0 transition-all"
          >
            {loading ? "Saving..." : "Continue"}
            {!loading && <ArrowRight className="h-5 w-5" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
