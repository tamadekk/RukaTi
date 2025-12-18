import { Twitter, Facebook, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { footerLinks } from "@/const/navigation-links";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black bg-background font-mono">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 border-x border-black max-w-7xl">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 text-gray-500">
          <p className="text-xs sm:text-sm uppercase tracking-tight">
            © {year} RukaTi. All rights reserved.
          </p>

          <nav className="order-3 md:order-none flex items-center gap-6 sm:gap-8 text-xs sm:text-sm">
            {footerLinks.map((link) => {
              return (
                <Link
                  key={link.title}
                  to={link.href}
                  className="hover:text-black transition-colors"
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5 sm:gap-6">
            <a
              aria-label="Twitter"
              href="#twitter"
              className="hover:text-black transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              aria-label="Facebook"
              href="#facebook"
              className="hover:text-black transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              aria-label="Instagram"
              href="#instagram"
              className="hover:text-black transition-colors"
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
