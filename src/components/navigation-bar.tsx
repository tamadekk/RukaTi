import { useState } from "react";
import { navigationItems } from "@/const/header-navigation";
import { Menu as MenuIcon, X } from "lucide-react";

const NavigationItems = () =>
  navigationItems.map((item) => (
    <a
      key={item.title}
      href={item.href}
      className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200"
    >
      <item.icon className="inline mr-2 h-5 w-5 align-text-bottom" />
      {item.title}
    </a>
  ));

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const DesktopNavigation = () => (
    <nav className="hidden md:flex items-center space-x-8">
      <NavigationItems />
    </nav>
  );

  const MobileNavigation = () => {
    return (
      <>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="fixed top-0 left-0 bg-white md:hidden">
            <div className="p-4 space-y-2">
              <NavigationItems />
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <DesktopNavigation />
      <MobileNavigation />
    </div>
  );
};

export default NavigationBar;
