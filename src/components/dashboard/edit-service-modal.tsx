import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    await updateService(service.service_id, data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
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
