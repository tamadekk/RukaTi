const ServicePerformance = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col gap-2">
      <div className="font-semibold mb-2">Service Performance</div>
      <div className="flex items-center justify-between text-sm">
        <span>Total Bookings</span>
        <span className="font-bold text-lg">28</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>Avg Rating</span>
        <span className="font-bold text-lg text-yellow-500">4.9 ★</span>
      </div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span>Profile Views (30 days)</span>
        <span className="font-bold text-lg">125</span>
      </div>
      <div className="bg-gray-100 rounded h-20 flex items-center justify-center text-gray-400 text-xs">
        Chart/placeholder
      </div>
    </div>
  );
};

export default ServicePerformance;
