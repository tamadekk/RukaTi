import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";

type ServiceHeaderProps = {
  onBack: () => void;
  onShare: () => void;
};

export const ServiceHeader = ({ onBack, onShare }: ServiceHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b border-black pb-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="pl-0 hover:bg-transparent hover:underline uppercase font-bold tracking-widest gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </Button>
      <Button
        variant="outline"
        onClick={onShare}
        className="rounded-none border-black hover:bg-gray-100 uppercase gap-2"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    </div>
  );
};
