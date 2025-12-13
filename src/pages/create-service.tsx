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
    <div className="min-h-screen bg-background font-mono p-4 md:p-8 flex justify-center items-start pt-12 md:pt-20">
      <Card className="w-full max-w-5xl border border-black shadow-none rounded-none bg-white p-6 md:p-10">
        <CardHeader className="p-0 mb-8 border-b border-black pb-6">
          <CardTitle className="text-3xl md:text-4xl font-bold text-center uppercase tracking-tight">
            Create a Service
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 space-y-8">
          <CreateServiceForm onSubmit={onSubmit} loading={false} />
        </CardContent>
      </Card>
    </div>
  );
}
