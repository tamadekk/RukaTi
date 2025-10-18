import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <header>
      <h1>Header</h1>
    </header>
    <Outlet />
    <TanStackRouterDevtools />
    <footer>
      <p>Footer</p>
    </footer>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
