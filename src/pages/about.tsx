import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function AboutPage() {
  return (
    <DashboardLayout>
      <div className="space-y-20 py-12 px-4 md:px-0 max-w-5xl mx-auto">
        {/* Header Section */}
        <section className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            Skill <br /> Connection <br /> Infrastructure.
          </h1>
          <p className="text-xl font-mono text-muted-foreground max-w-2xl mt-4">
            RukaTi is the decentralized marketplace for local expertise.
          </p>
        </section>

        {/* Mission/Community - Reduced Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-black border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-white p-10 space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight">
              Our Mission
            </h2>
            <p className="font-mono text-sm leading-relaxed text-neutral-600">
              To empower neighborhood communities by creating a transparent,
              accessible marketplace for every skill. We bridge the gap between
              untapped talent and local needs.
            </p>
          </div>

          <div className="bg-neutral-50 p-10 space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight">
              Community First
            </h2>
            <p className="font-mono text-sm leading-relaxed text-neutral-600">
              We believe in "Ruka Ti" (Your Hand). By helping each other, we
              build resilient local economies and meaningful connections right
              where you live.
            </p>
          </div>
        </div>

        {/* Why RukaTi? Features - Reduced font sizes */}
        <section className="space-y-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Distinction
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border border-black p-6 hover:bg-black hover:text-white transition-colors duration-300">
              <h3 className="font-bold uppercase text-sm mb-2">
                Literal Proximity
              </h3>
              <p className="font-mono text-[9px] opacity-70">
                Focusing on your immediate neighborhood ensures the fastest
                response and strongest trust.
              </p>
            </div>
            <div className="border border-black p-6 hover:bg-black hover:text-white transition-colors duration-300">
              <h3 className="font-bold uppercase text-sm mb-2">Pure Utility</h3>
              <p className="font-mono text-[9px] opacity-70">
                A streamlined interface designed for one purpose: getting stuff
                done without the noise.
              </p>
            </div>
            <div className="border border-black p-6 hover:bg-black hover:text-white transition-colors duration-300">
              <h3 className="font-bold uppercase text-sm mb-2">
                Verified Trust
              </h3>
              <p className="font-mono text-[9px] opacity-70">
                Real reviews and a community-driven reputation system you can
                actually rely on.
              </p>
            </div>
          </div>
        </section>

        {/* Values - High Impact */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10 border-t border-black">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              01 // Integrity
            </h3>
            <p className="font-mono text-sm">
              Truth in every listing. Fairness in every deal.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              02 // Openness
            </h3>
            <p className="font-mono text-sm">
              Anyone can participate. Everyone has a skill.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              03 // Impact
            </h3>
            <p className="font-mono text-sm">
              We grow when your community grows.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-black text-white p-12 md:p-20 text-center space-y-8 border-t-8 border-black">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Join The <br /> Infrastructure.
          </h2>
          <div className="pt-4">
            <Link to="/register">
              <Button
                variant="outline"
                className="rounded-none bg-white text-black border-white uppercase font-black tracking-widest px-12 py-8 h-auto text-xl transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                Join RukaTi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
