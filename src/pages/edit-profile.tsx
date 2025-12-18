import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUserProfileStore } from "@/store/userProfileStore";
import { useUserSession } from "@/store/userSessionsStore";
import { toast } from "sonner";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { uploadAvatar } from "@/lib/user";

import { checkHasChanges } from "@/lib/utils";

export function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useUserSession();
  const { userProfile, loading, fetchUserProfile, updateUserProfile } =
    useUserProfileStore();

  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    phone_number: "",
    avatar: "",
    role: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [user?.id, fetchUserProfile]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        bio: userProfile.bio || "",
        phone_number: userProfile.phone_number || "",
        avatar: userProfile.avatar || "",
        role: userProfile.role || "",
      });
    }
  }, [userProfile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setSelectedFile(null);
    setFormData((prev) => ({ ...prev, avatar: "" }));
  };

  const hasChanges = () => {
    if (!userProfile) return false;
    if (selectedFile) return true;

    return checkHasChanges(formData, userProfile, [
      "full_name",
      "bio",
      "phone_number",
      "avatar",
    ]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      toast.error("Full Name is required.");
      return;
    }

    if (!hasChanges()) {
      toast.info("No changes detected.");
      return;
    }

    try {
      let currentAvatarUrl = formData.avatar;

      if (selectedFile) {
        toast.loading("Uploading photo...", { id: "upload" });
        currentAvatarUrl = await uploadAvatar(selectedFile);
        toast.dismiss("upload");
      }

      await updateUserProfile({
        ...formData,
        avatar: currentAvatarUrl,
      });

      setSelectedFile(null);
      toast.success("Profile updated successfully");

      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 1000);
    } catch (error) {
      toast.dismiss("upload");
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/dashboard" });
  };

  const memberSince = userProfile?.created_at
    ? new Date(userProfile.created_at).toLocaleDateString()
    : "N/A";

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <EditProfileForm
        formData={formData}
        email={userProfile?.email || ""}
        userId={userProfile?.user_id || ""}
        memberSince={memberSince}
        loading={loading}
        onChange={handleInputChange}
        onAvatarChange={handleAvatarChange}
        onRemoveAvatar={handleRemoveAvatar}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
