import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/header";
import Footer from "@/components/footer";
import NotFound from "@/components/not-found";
import { useUserSession } from "@/store/userSessionsStore";
import { MobileBottomBar } from "@/components/navigation/mobile-bottom-bar";

const RootLayout = () => {
  const { user } = useUserSession();
  const navigate = useNavigate();

  const handleCreateService = () => {
    navigate({ to: "/my-services", search: { create: true } });
  };

  return (
    <main className="flex flex-col min-h-dvh font-mono">
      <Header />
      <div className={user ? "pb-16 md:pb-0" : ""}>
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
      <div className="mt-auto" />
      <Footer />
      {user && <MobileBottomBar onCreateService={handleCreateService} />}
      <Toaster />
    </main>
  );
};
export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
});
