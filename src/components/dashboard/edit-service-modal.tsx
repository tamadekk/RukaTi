import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { CreateServiceForm } from "@/components/create-service-form";
import type { UserServices } from "@/types/user";
import { useServiceStore } from "@/store/userServicesStore";
import type { ServiceFormData } from "@/schemas/services";

interface EditServiceModalProps {
  service: UserServices;
  isOpen: boolean;
  onClose: () => void;
}

export const EditServiceModal = ({
  service,
  isOpen,
  onClose,
}: EditServiceModalProps) => {
  const updateService = useServiceStore((state) => state.updateService);
  const loading = useServiceStore((state) => state.loading);

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      await updateService(service.service_id, data);
      toast.success("Service updated successfully");
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update service");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto border-2 border-black p-8 sm:rounded-none bg-white shadow-none">
        <DialogHeader className="mb-6 border-b border-black pb-4">
          <DialogTitle className="text-2xl font-bold uppercase tracking-tight font-mono">
            Edit Service
          </DialogTitle>
        </DialogHeader>
        <CreateServiceForm
          onSubmit={handleSubmit}
          loading={loading}
          defaultValues={{
            title: service.title,
            description: service.description,
            category: service.category,
            location: service.location,
            contact: service.contact,
            price_range: service.price_range,
            availability: service.availability,
            // image handling might be complex, skipping for now or treating as optional
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
