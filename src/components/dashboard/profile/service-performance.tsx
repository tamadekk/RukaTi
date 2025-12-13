const getRatingColor = (rating: number) => {
  if (rating > 3.5) return "text-green-600";
  if (rating > 2.0) return "text-yellow-600";
  return "text-red-600";
};

const ServicePerformance = () => {
  return (
    <div className="flex flex-col gap-4 h-full bg-white border border-black p-6">
      <div className="flex items-center justify-between border-b border-black pb-4 mb-2">
         <div className="font-bold uppercase tracking-tight">Service Performance</div>
         <div className="text-xs font-mono text-gray-500">Last 30 Days</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
           <span className="block text-2xl font-bold">28</span>
           <span className="text-xs text-gray-500 font-mono uppercase">Bookings</span>
        </div>
        <div>
           <span className={`block text-2xl font-bold ${getRatingColor(4.9)}`}>4.9</span>
           <span className="text-xs text-gray-500 font-mono uppercase">Rating</span>
        </div>
        <div>
           <span className="block text-2xl font-bold">125</span>
           <span className="text-xs text-gray-500 font-mono uppercase">Views</span>
        </div>
      </div>

      <div className="mt-4 border border-black h-24 flex items-center justify-center text-gray-400 text-xs font-mono bg-neutral-50">
        [ Chart Placeholder ]
      </div>
    </div>
  );
};

export default ServicePerformance;
