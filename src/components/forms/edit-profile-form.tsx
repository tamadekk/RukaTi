import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  Save,
  Camera,
  Briefcase,
  Lock,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type EditProfileFormProps = {
  formData: {
    full_name: string;
    bio: string;
    phone_number: string;
    avatar: string;
    role: string;
  };
  email: string;
  userId: string;
  memberSince: string;
  loading: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onAvatarChange: (file: File) => void;
  onRemoveAvatar: () => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export function EditProfileForm({
  formData,
  email,
  userId,
  memberSince,
  loading,
  onChange,
  onAvatarChange,
  onRemoveAvatar,
  onSave,
  onCancel,
}: EditProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header Section */}
      <section className="space-y-4 border-b-2 border-black pb-8">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
          Edit Profile
        </h1>
        <p className="text-base text-muted-foreground">
          Update your public profile and contact information.
        </p>
      </section>

      <form
        onSubmit={onSave}
        className="grid grid-cols-1 xl:grid-cols-12 gap-12"
      >
        {/* Left Column - Photo & Basic Info */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-neutral-50 border-2 border-black p-8 text-center space-y-6 relative">
            <h3 className="text-sm font-bold uppercase tracking-widest">
              Profile Photo
            </h3>

            <div className="relative inline-block">
              <Avatar className="h-48 w-48 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto overflow-hidden">
                <AvatarImage src={formData.avatar} className="object-cover" />
                <AvatarFallback className="rounded-none bg-neutral-200 text-5xl font-black">
                  {formData.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                className="absolute -bottom-2 -right-2 bg-black text-white p-3 hover:bg-neutral-800 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1),4px_4px_0px_1px_rgba(0,0,0,1)]"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-6 w-6" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="pt-2 text-[11px] text-muted-foreground uppercase font-bold tracking-tight">
              Click the camera icon to upload a photo.
              {formData.avatar && (
                <button
                  type="button"
                  onClick={onRemoveAvatar}
                  className="block mx-auto mt-4 text-red-600 hover:underline"
                >
                  Remove current photo
                </button>
              )}
            </div>
          </div>

          <div className="bg-white border-2 border-black p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-widest">
                Account Info
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  Joined RukaTi
                </span>
                <span className="font-medium">{memberSince}</span>
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                  User ID
                </span>
                <span className="text-[11px] font-mono break-all">
                  {userId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Inputs */}
        <div className="xl:col-span-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <UserIcon className="h-4 w-4" /> Full Name
              </label>
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={onChange}
                placeholder="Ex. Jane Doe"
                className="rounded-none border-2 border-black h-14 text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
              />
            </div>

            <div className="space-y-3 relative">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-50">
                  <Briefcase className="h-4 w-4" /> What do you do?
                </label>
                <span className="text-[9px] font-black bg-black text-white px-1.5 py-0.5 uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                  Coming Soon
                </span>
              </div>
              <div className="relative group">
                <Input
                  name="role"
                  value={formData.role}
                  disabled
                  placeholder="Ex. Electrician, Garden Designer"
                  className="rounded-none border-2 border-neutral-300 bg-neutral-50 h-14 text-base px-4 cursor-not-allowed pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone Number
              </label>
              <Input
                name="phone_number"
                value={formData.phone_number}
                onChange={onChange}
                placeholder="+1 (555) 000-0000"
                className="rounded-none border-2 border-black h-14 text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
              />
            </div>

            <div className="space-y-3 relative">
              <div className="flex items-center justify-between text-muted-foreground">
                <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-50">
                  <Mail className="h-4 w-4" /> Email Address
                </label>
                <span className="text-[9px] font-black border border-black px-1.5 py-0.5 uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                  Coming Soon
                </span>
              </div>
              <div className="relative group">
                <Input
                  value={email}
                  disabled
                  className="rounded-none border-2 border-neutral-300 bg-neutral-100 h-14 text-base px-4 cursor-not-allowed pr-10"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <FileText className="h-4 w-4" /> About You
              </label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={onChange}
                placeholder="Tell the community a bit about yourself and your skills..."
                className="rounded-none border-2 border-black min-h-[200px] text-base focus-visible:ring-0 focus-visible:ring-offset-0 p-4 resize-none"
              />
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row gap-6">
            <Button
              type="submit"
              disabled={loading}
              className="rounded-none bg-black text-white hover:bg-neutral-800 uppercase font-bold tracking-[0.2em] px-12 h-16 text-xl flex-1 sm:flex-none flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-[-4px] active:translate-y-0 transition-all"
            >
              <Save className="h-5 w-5" />{" "}
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="rounded-none border-2 border-black uppercase font-bold tracking-[0.2em] px-12 h-16 text-xl flex-1 sm:flex-none hover:bg-neutral-50 transition-all font-sans"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
