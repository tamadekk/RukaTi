import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center md:items-center justify-between gap-4 text-muted-foreground">
          <p className="text-xs sm:text-sm">
            © {year} RukaTi. All rights reserved.
          </p>

          <nav className="order-3 md:order-none flex items-center gap-6 sm:gap-8 text-xs sm:text-sm">
            <a
              href="#about"
              className="hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
          </nav>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              aria-label="Twitter"
              href="#twitter"
              className="hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              aria-label="Facebook"
              href="#facebook"
              className="hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              aria-label="Instagram"
              href="#instagram"
              className="hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
