type ServicesStatsProps = {
  total: number;
  filtered: number;
};

export const ServicesStats = ({ total, filtered }: ServicesStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border-2 border-black p-6 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Total Services
        </span>
        <span className="text-4xl font-black mt-2">{total}</span>
      </div>
      <div className="bg-white border-2 border-black p-6 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Matches Found
        </span>
        <span className="text-4xl font-black mt-2 text-blue-600">
          {filtered}
        </span>
      </div>
    </div>
  );
};
