import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateServiceForm } from "@/components/forms/create-service-form";
import { useCreateService } from "@/hooks/useUserServicesQuery";
import { ServiceSchema, type ServiceFormData } from "@/schemas/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserSession } from "@/store/userSessionsStore";
import { useUserProfile } from "@/hooks/useUserProfileQuery";
import { useAsyncAction } from "@/hooks/use-async-action";
import { uploadImage } from "@/lib/storage";
import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { isUserOnboarded } from "@/lib/user";
import type { UserServices } from "@/types/user";

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateServiceModal = ({
  isOpen,
  onClose,
}: CreateServiceModalProps) => {
  const user = useUserSession((state) => state.user);
  const { data: userProfile } = useUserProfile(user?.id);
  const { mutateAsync: createService } = useCreateService();
  const { isLoading, execute } = useAsyncAction();

  const isOnboarded = isUserOnboarded(userProfile);

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(ServiceSchema),
  });

  const onSubmitHandler = async (values: ServiceFormData) => {
    if (!user?.id) return;
    await execute(
      async () => {
        const service_id = crypto.randomUUID();
        const created_at = new Date().toISOString();
        const imageFile = values.service_image?.[0];
        const service_image = imageFile
          ? await uploadImage({
              file: imageFile,
              bucket: "user_services",
              folderPath: "service_image",
              fileNamePrefix: user.id,
            })
          : "";
        const service: UserServices = {
          service_id,
          user_id: user.id,
          title: values.title,
          description: values.description,
          category: values.category,
          location: values.location ?? "",
          contact: values.contact ?? "",
          price_range: values.price_range ?? "",
          availability: values.availability ?? "",
          service_image: service_image,
          rating: 0,
          created_at,
        };
        await createService(service);
      },
      {
        successMessage: "Service created successfully",
        errorMessage: "Failed to create service",
        onSuccess: onClose,
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full sm:w-[95vw] sm:max-w-7xl sm:h-auto sm:max-h-[90vh] overflow-y-auto border-0 sm:border-2 border-black p-6 sm:p-8 sm:rounded-none bg-white shadow-none left-0 top-0 translate-x-0 translate-y-0 sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] max-w-none sm:max-w-7xl">
        <DialogHeader className="mb-6 border-b border-black pb-4">
          <DialogTitle className="text-2xl font-bold uppercase tracking-tight font-mono">
            Create New Service
          </DialogTitle>
        </DialogHeader>

        {isOnboarded ? (
          <CreateServiceForm
            form={form}
            onSubmit={onSubmitHandler}
            loading={isLoading}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
            <div className="border-2 border-black p-4 bg-neutral-50">
              <ShieldAlert className="h-10 w-10 mx-auto" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase tracking-tight">
                Complete Your Profile First
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                You need to finish setting up your profile before you can list a
                service.
              </p>
            </div>
            <Link
              to="/onboarding"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-widest text-sm px-8 h-12 hover:bg-neutral-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-[-2px] active:translate-y-0"
            >
              Go to Onboarding
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
