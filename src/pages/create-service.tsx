import { useServiceStore } from "@/store/userServicesStore";
import { CreateServiceForm } from "@/components/create-service-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ServiceFormData } from "@/schemas/services";
import type { SubmitHandler } from "react-hook-form";
import { useUserSession } from "@/store/userSessionsStore";
import supabase from "@/supabase-client";
import { useNavigate } from "@tanstack/react-router";

export default function CreateServicePage() {
  const navigate = useNavigate();
  const user = useUserSession((state) => state.user);
  const { createService } = useServiceStore();

  const onSubmit: SubmitHandler<ServiceFormData> = async (values) => {
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
      return;
    }
    createService(service);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen p-4 flex justify-center">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Create a Service
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <CreateServiceForm onSubmit={onSubmit} loading={false} />
        </CardContent>
      </Card>
    </div>
  );
}
