type Service = {
  title: string;
  category: string;
  description: string;
  image: string;
};

const ServicesSection = ({ services }: { services: Service[] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      <div className="font-semibold mb-4">Your Services</div>
      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg p-3"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-14 h-14 rounded-lg object-cover mr-0 sm:mr-3 mb-2 sm:mb-0"
            />
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs text-gray-500 font-medium">
                {service.category}
              </span>
              <div className="font-semibold text-base leading-tight">
                {service.title}
              </div>
              <div className="text-gray-600 text-sm">{service.description}</div>
            </div>
            <button className="w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs font-medium">
              Manage
            </button>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 rounded-lg bg-green-900 text-white font-medium hover:bg-green-800 transition">
        + Add New Service
      </button>
    </div>
  );
};

export default ServicesSection;
