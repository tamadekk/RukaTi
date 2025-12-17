import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32 border-x border-black max-w-7xl">
        <div className="mx-auto max-w-3xl text-center text-black">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow">
            Find Local Help, or
            <br className=" sm:block" />
            Offer Your Skills
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-mono">
            Connect with your community for services like home repairs,
            tutoring, and more.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services">
              <Button className="w-full sm:w-auto text-lg h-14 px-8 uppercase font-bold tracking-widest bg-black text-white hover:bg-neutral-800 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all">
                Find Services
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-lg h-14 px-8 uppercase font-bold tracking-widest border-2 border-black bg-white text-black hover:bg-gray-100 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                Offer Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
