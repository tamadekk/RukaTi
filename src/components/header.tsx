import Logo from "@/components/logo";
import NavigationBar from "@/components/navigation-bar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-black h-16 flex items-center justify-between">
        <Logo />
        <NavigationBar />
      </div>
    </header>
  );
};

export default Header;
