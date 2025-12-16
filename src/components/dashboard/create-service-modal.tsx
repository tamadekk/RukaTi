import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateServiceForm } from "@/components/create-service-form";
import { useServiceStore } from "@/store/userServicesStore";
import type { ServiceFormData } from "@/schemas/services";
import { useUserSession } from "@/store/userSessionsStore";
import supabase from "@/supabase-client";
import { toast } from "sonner";

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateServiceModal = ({
  isOpen,
  onClose,
}: CreateServiceModalProps) => {
  const { createService } = useServiceStore();
  const user = useUserSession((state) => state.user);

  const handleSubmit = async (values: ServiceFormData) => {
    if (!user?.id) return;

    const service_id = crypto.randomUUID();
    const created_at = new Date().toISOString();

    const service = {
      service_id,
      user_id: user.id,
      title: values.title,
      description: values.description,
      category: values.category,
      location: values.location ?? "",
      contact: values.contact ?? "",
      price_range: values.price_range ?? "",
      availability: values.availability ?? "",
      service_image: values.service_image ?? "",
      rating: 0,
      created_at,
    };

    const { error } = await supabase.from("user_services").insert(service);

    if (error) {
      console.error("Supabase error:", error);
      toast.error("Failed to create service");
      return;
    }
    createService(service);
    toast.success("Service created successfully");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto border-2 border-black p-8 sm:rounded-none bg-white shadow-none">
        <DialogHeader className="mb-6 border-b border-black pb-4">
          <DialogTitle className="text-2xl font-bold uppercase tracking-tight font-mono">
            Create New Service
          </DialogTitle>
        </DialogHeader>
        <CreateServiceForm onSubmit={handleSubmit} loading={false} />
      </DialogContent>
    </Dialog>
  );
};
