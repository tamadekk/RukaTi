import { Button } from "@/components/ui/button";

type ServiceOfferHeaderProps = {
  onOpenCreateModal: () => void;
};

export const ServiceOfferHeader = ({
  onOpenCreateModal,
}: ServiceOfferHeaderProps) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 border border-black">
      <div>
        <h2 className="font-bold uppercase tracking-tight">
          Offer your services
        </h2>
        <p className="text-xs text-gray-500 font-mono">
          Join the marketplace today
        </p>
      </div>
      <Button onClick={onOpenCreateModal} className="uppercase font-bold">
        Create Service
      </Button>
    </div>
  );
};
