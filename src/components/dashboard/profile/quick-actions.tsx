const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col gap-3">
      <div className="font-semibold mb-2">Quick Actions</div>
      <button className="w-full py-2 rounded bg-green-900 text-white font-medium hover:bg-green-800">
        Promote Service
      </button>
      <button className="w-full py-2 rounded bg-gray-100 hover:bg-gray-200 font-medium">
        View Calendar
      </button>
      <button className="w-full py-2 rounded bg-gray-100 hover:bg-gray-200 font-medium">
        Update Availability
      </button>
    </div>
  );
};

export default QuickActions;
