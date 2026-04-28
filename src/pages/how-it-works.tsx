import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  Search,
  MessageCircle,
  Star,
  PlusCircle,
  Eye,
  Handshake,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const customerSteps = [
  {
    number: "01",
    icon: Search,
    title: "Search & Filter",
    description:
      "Browse services by category, neighborhood, or keyword. No ads, no noise — only local providers who actually offer what you need.",
  },
  {
    number: "02",
    icon: Eye,
    title: "Review the Provider",
    description:
      "Each listing shows ratings, reviews from real neighbors, pricing range, and availability. Make an informed decision in seconds.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Contact Directly",
    description:
      "Reach the provider directly with their contact details. No middleman, no platform fees, no waiting.",
  },
  {
    number: "04",
    icon: Star,
    title: "Leave a Review",
    description:
      "After the job is done, leave a review. Your feedback builds the community's trust and helps others find the right person.",
  },
];

const providerSteps = [
  {
    number: "01",
    icon: PlusCircle,
    title: "Create Your Listing",
    description:
      "Describe your service, set your price range, upload a photo, and choose your neighborhood. It takes less than 5 minutes.",
  },
  {
    number: "02",
    icon: Eye,
    title: "Get Discovered",
    description:
      "Your listing appears in search results for customers in your area. No bidding, no algorithm games — just visibility.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Customers Contact You",
    description:
      "Interested customers reach out directly through your listed contact details. You control the conversation from the start.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Build Your Reputation",
    description:
      "Each completed job is a chance to earn a 5-star review. The more reviews you collect, the higher you rank and the more you earn.",
  },
];

const problems = [
  {
    platform: "Facebook Groups",
    issues: [
      "Posts buried in hours",
      "No search or filters",
      "Impossible to verify quality",
      "Chaos with hundreds of comments",
    ],
  },
  {
    platform: "Njuškalo",
    issues: [
      "Designed for products, not services",
      "Flooded with irrelevant listings",
      "No neighborhood filtering",
      "No review system",
    ],
  },
  {
    platform: "Google Maps",
    issues: [
      "Only shows registered businesses",
      "Misses independent freelancers",
      "Hard to contact directly",
      "No local community layer",
    ],
  },
];

const beliefs = [
  {
    number: "01",
    title: "Local beats global.",
    body: "The best person to fix your roof lives two streets over. We make sure you can find them.",
  },
  {
    number: "02",
    title: "Simplicity is respect.",
    body: "Your time matters. We built RukaTi to give you answers in seconds, not after 15 clicks.",
  },
  {
    number: "03",
    title: "Trust is earned, not assumed.",
    body: "Every review on this platform comes from a real person who hired a real provider. No fake stars.",
  },
  {
    number: "04",
    title: "Everyone has something to offer.",
    body: "Whether you're a licensed electrician or someone who bakes great cakes, there's a place for you here.",
  },
];

export function HowItWorksPage() {
  return (
    <DashboardLayout>
      <div className="space-y-24 py-12 px-4 md:px-0 max-w-5xl mx-auto w-full font-mono">
        {/* Hero */}
        <section className="space-y-6 border-b border-black pb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            How it works
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            Local help,
            <br />
            without the
            <br />
            chaos.
          </h1>
          <p className="text-base text-neutral-600 max-w-xl leading-relaxed">
            RukaTi is a service marketplace built for Rijeka. It connects people
            who need local help with skilled neighbors who can provide it —
            simply, transparently, and without the noise of generic platforms.
          </p>
        </section>

        {/* The Problem */}
        <section className="space-y-10">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              The problem
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Finding local help is broken.
            </h2>
            <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed pt-1">
              In Rijeka, finding a plumber, a tutor, or a dog walker means
              digging through Facebook group chaos, scrolling past irrelevant
              Njuškalo product ads, or getting zero results on Google. None of
              these tools were built for this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-black border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {problems.map((p) => (
              <div key={p.platform} className="bg-white p-8 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <h3 className="font-bold uppercase text-sm tracking-widest">
                    {p.platform}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {p.issues.map((issue) => (
                    <li
                      key={issue}
                      className="text-xs text-neutral-500 flex items-start gap-2"
                    >
                      <span className="mt-1 w-1.5 h-1.5 bg-neutral-300 rounded-full shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* For Customers */}
        <section className="space-y-10">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              For customers
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Find help in 4 steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {customerSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="border border-black p-8 space-y-4 hover:bg-black hover:text-white transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground group-hover:text-neutral-400">
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-tight text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-70">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link to="/services">
              <Button className="rounded-none bg-black text-white border border-black uppercase font-bold tracking-widest px-8 h-12 hover:bg-white hover:text-black transition-colors">
                Browse Services
              </Button>
            </Link>
          </div>
        </section>

        {/* For Providers */}
        <section className="space-y-10 pt-10 border-t border-black">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              For providers
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Get discovered, get hired.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {providerSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="border border-black p-8 space-y-4 hover:bg-black hover:text-white transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground group-hover:text-neutral-400">
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold uppercase tracking-tight text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-70">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link to="/register">
              <Button className="rounded-none bg-black text-white border border-black uppercase font-bold tracking-widest px-8 h-12 hover:bg-white hover:text-black transition-colors">
                List Your Service
              </Button>
            </Link>
          </div>
        </section>

        {/* What we believe */}
        <section className="space-y-10 pt-10 border-t border-black">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
              What we believe
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Built on principles,
              <br />
              not algorithms.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-black border border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {beliefs.map((b) => (
              <div key={b.number} className="bg-white p-8 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-bold uppercase text-sm tracking-tight">
                      {b.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-black text-white p-12 md:p-20 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Ready to start?
          </h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Join hundreds of people in Rijeka already using RukaTi to get things
            done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/services">
              <Button
                variant="outline"
                className="rounded-none bg-white text-black border-white uppercase font-black tracking-widest px-10 py-6 h-auto hover:bg-transparent hover:text-white transition-colors"
              >
                Find a Service
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="outline"
                className="rounded-none bg-transparent text-white border-white uppercase font-black tracking-widest px-10 py-6 h-auto hover:bg-white hover:text-black transition-colors"
              >
                Offer a Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
