import { Button } from "@/components/ui/button";

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

          <div className="mt-8 flex justify-center">
            <form
              className="w-full max-w-xl"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex items-stretch bg-white border border-black shadow-none">
                <input
                  type="search"
                  placeholder="Search for services like 'plum'"
                  className="flex-1 px-5 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/80 bg-transparent outline-none font-mono"
                  aria-label="Search for services"
                />
                <Button
                  type="submit"
                  className="rounded-none h-auto px-6 font-semibold"
                  variant="default"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
