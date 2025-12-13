import { Button } from "@/components/ui/button";

const QuickActions = () => {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="font-semibold mb-2 uppercase tracking-tight text-sm text-gray-500">Quick Actions</div>
      <Button className="w-full justify-start" variant="default">
        Promote Service
      </Button>
      <Button className="w-full justify-start" variant="outline">
        View Calendar
      </Button>
      <Button className="w-full justify-start" variant="outline">
        Update Availability
      </Button>
    </div>
  );
};

export default QuickActions;
