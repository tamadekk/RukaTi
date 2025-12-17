import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import CategoriesSidebar from "@/components/dashboard/categories-sidebar";

export const MobileFilters = () => {
  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase font-bold tracking-widest bg-black text-white hover:bg-gray-800 border-2 border-white px-6 py-6">
            <span>Filters</span>
            <Filter className="w-4 h-4 ml-2" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] sm:w-[540px] p-0 font-mono border-r border-black"
        >
          <SheetHeader className="p-6 border-b border-black text-left">
            <SheetTitle className="uppercase font-bold tracking-tight">
              Marketplace Filters
            </SheetTitle>
          </SheetHeader>
          <div className="p-6 h-full">
            <CategoriesSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
