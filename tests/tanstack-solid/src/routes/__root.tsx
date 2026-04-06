import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import type { ThcContextWithRouter } from "@thcjs/core/types";
import { HeadController } from "@thcjs/solid";
import { Suspense } from "solid-js";
import Header from "../components/Header";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<ThcContextWithRouter>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
      {
        property: "og:title",
        content: "TanStack Start Starter",
      },
      {
        property: "og:description",
        content: "A starter template for TanStack Start with React.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    styles: [
      {
        children: `body { margin: 0; padding: 0; }`,
      },
    ],
    scripts: [
      {
        children: `console.log("Hello from inline script!");`,
      },
    ],
  }),
  shellComponent: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <HeadController />
      </head>
      <body>
        <Suspense>
          <Header />
          <Outlet />
          <TanStackRouterDevtools />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
