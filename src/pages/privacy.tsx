import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export function PrivacyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12 py-12 px-4 md:px-0 max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="space-y-4 border-b-2 border-black pb-8">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Last Updated: December 18, 2025
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-10 font-mono text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              1. What We Collect
            </h2>
            <p>
              We collect only the basics. This includes your email for logging
              in and any profile or service details you choose to share. We
              don't use your data for anything else.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              2. Your Location
            </h2>
            <p>
              We use your location to show you services nearby. We don't track
              where you go or save a history of your movements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              3. How Your Data is Stored
            </h2>
            <p>
              We use secure, professional tools to keep your data safe. We will
              never sell your personal information to advertisers.
            </p>
          </section>

          <section className="space-y-3 border-l-4 border-black pl-6 py-4 bg-neutral-50">
            <h2 className="text-xl font-bold uppercase text-black">
              4. Your Data, Your Control
            </h2>
            <p className="italic">
              You can view, change, or delete your information at any time right
              from your dashboard.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              5. Cookies
            </h2>
            <p>
              We use a few simple cookies just to keep you logged in. No
              marketing or tracking cookies here.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="pt-8 border-t border-black">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            End of Document
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
