import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "@/components/header";

const RootLayout = () => (
  <main className="flex flex-col min-h-dvh">
    <Header />
    <Outlet />
    <TanStackRouterDevtools />
    <footer className="mt-auto">
      <p>Footer</p>
    </footer>
  </main>
);
export const Route = createRootRoute({ component: RootLayout });
