import { Edit3, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    id: "post-service",
    title: "Post a Service",
    description: "Describe what you need done or what skills you can offer.",
    icon: Edit3,
  },
  {
    id: "connect",
    title: "Connect",
    description:
      "Browse profiles, chat with providers, and agree on the details.",
    icon: Users,
  },
  {
    id: "get-done",
    title: "Get It Done",
    description:
      "Complete the job and handle payments securely through the platform.",
    icon: CheckCircle,
  },
];

const StepCard = ({ step }: { step: (typeof steps)[0]; index: number }) => {
  const IconComponent = step.icon;

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-16 h-16 bg-white flex items-center justify-center border border-black">
        <IconComponent className="w-8 h-8 text-black" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-gray-600 max-w-sm">{step.description}</p>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <section className="bg-white border-t border-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-x border-black max-w-7xl py-16">
          <div className="text-center mb-12 font-mono">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
