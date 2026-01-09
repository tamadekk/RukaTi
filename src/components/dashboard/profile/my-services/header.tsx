import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Plus } from "lucide-react";

type ServicesHeaderProps = {
  onCreateClick: () => void;
};

export const ServicesHeader = ({ onCreateClick }: ServicesHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
          Service <span className="text-blue-600">Hub</span>
        </h1>
        <p className="text-gray-500 font-mono text-sm">
          Manage and scale your service portfolio
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onCreateClick}
          className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-6 font-mono uppercase tracking-widest border-2 border-black transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>
    </div>
  );
};
