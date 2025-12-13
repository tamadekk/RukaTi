import Logo from "@/components/logo";
import NavigationBar from "@/components/navigation-bar";

const Header = () => {
  return (
    <header className="sticky top-0 z-5 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <NavigationBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
