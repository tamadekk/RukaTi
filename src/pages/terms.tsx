import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export function TermsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-12 py-12 px-4 md:px-0 max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="space-y-4 border-b-2 border-black pb-8">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Last Updated: December 18, 2025
          </p>
        </section>

        {/* Content Sections */}
        <div className="space-y-10 font-mono text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              1. Acceptance of Terms
            </h2>
            <p>
              By using RukaTi, you agree to these terms. If you do not agree,
              please do not use the platform. Our mission is to connect
              neighbors, and these rules help keep the community safe.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              2. Your Conduct
            </h2>
            <p>
              Please provide honest information when listing or booking
              services. We expect all users to act with respect. Any form of
              harassment or fraud will lead to account removal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              3. How Transactions Work
            </h2>
            <p>
              RukaTi is an introductory platform. We help you find help, but we
              are not part of your agreements. Payments, schedules, and quality
              of work are managed directly between the provider and the client.
            </p>
          </section>

          <section className="space-y-3 border-l-4 border-black pl-6 py-4 bg-neutral-50">
            <h2 className="text-xl font-bold uppercase text-black">
              4. Liability
            </h2>
            <p>
              RukaTi is provided "as is." We are not responsible for any
              disputes or losses that occur between users. Please use caution
              when meeting new people and starting work.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold uppercase text-black">
              5. Updates to Terms
            </h2>
            <p>
              We may update these rules from time to time. If we do, we will
              update the date at the top of this page.
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
