import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";

import { createHeadController } from "@thcjs/core";
import { thcMerge } from "thc-plugin-merge";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: {
      ...createHeadController({
        plugins: [thcMerge()],
      }),
    },

    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
