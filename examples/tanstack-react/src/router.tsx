import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { createHeadController } from "tanstack-head-controller";
import { thcMerge } from "thc-plugin-merge";
import { routeTree } from "./routeTree.gen";

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

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
