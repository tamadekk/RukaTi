import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "@/components/header";
import Footer from "@/components/footer";
import NotFound from "@/components/not-found";

const RootLayout = () => {
  return (
    <main className="flex flex-col min-h-dvh font-mono">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
      <div className="mt-auto" />
      <Footer />
    </main>
  );
};
export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
});
