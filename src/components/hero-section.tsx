const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-100/50 to-transparent" />
      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full bg-center bg-cover"
          style={{
            backgroundImage: "url('/src/assets/hero-background.svg')",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow">
            Find Local Help, or
            <br className=" sm:block" />
            Offer Your Skills
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
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
              <div className="flex items-stretch bg-white/95 backdrop-blur rounded-full shadow-lg ring-1 ring-black/5 overflow-hidden">
                <input
                  type="search"
                  placeholder="Search for services like 'plum'"
                  className="flex-1 px-5 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/80 bg-transparent outline-none"
                  aria-label="Search for services"
                />
                <button
                  type="submit"
                  className="m-1 rounded-full bg-green-500 px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-white hover:bg-green-600 active:bg-green-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
