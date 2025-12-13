import { Button } from "@/components/ui/button";

const activities = [
  {
    id: 1,
    action: "Order Received",
    details: "New order for 'Plumbing Service' from Alice",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Service Updated",
    details: "Updated description for 'Math Tutoring'",
    time: "1 day ago",
  },
  {
    id: 3,
    action: "Profile Edited",
    details: "Changed bio information",
    time: "3 days ago",
  },
  {
    id: 4,
    action: "Welcome",
    details: "Joined RukaTi platform",
    time: "1 week ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white border border-black p-6">
      <div className="flex items-center justify-between mb-6 border-b border-black pb-4">
        <h3 className="text-lg font-bold uppercase tracking-tight">Recent Activity</h3>
        <Button variant="link" className="h-auto p-0 text-xs">
          View All
        </Button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="relative pl-6 border-l border-gray-200 last:border-0">
            <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 bg-black border border-white"></div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-gray-500">{activity.time}</span>
              <p className="font-bold text-sm">{activity.action}</p>
              <p className="text-sm text-gray-600">{activity.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
