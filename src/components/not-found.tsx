import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 min-h-[60vh] font-mono">
      <div className="space-y-2">
        <h1 className="text-8xl font-black tracking-tighter border-b-4 border-black inline-block px-4">
          404
        </h1>
        <h2 className="text-2xl font-bold uppercase tracking-tight mt-6">
          Page Not Found
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed pt-4">
          The link you followed may be broken, or the page may have been
          removed. Let&apos;s get you back on track.
        </p>
      </div>

      <div className="pt-6">
        <Link to="/">
          <Button
            variant="outline"
            className="rounded-none bg-black text-white border-black uppercase font-bold tracking-widest px-10 py-6 h-auto transition-all duration-200 hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-[-2px] active:translate-y-0"
          >
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
