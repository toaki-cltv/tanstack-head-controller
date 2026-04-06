import { useRouterState } from "@tanstack/solid-router";
import { _controller } from "@thcjs/core";
import { createComponent } from "solid-js";
import { HeadRender } from "./render";

export function HeadController() {
  const routes = useRouterState({ select: (s) => s.matches })();
  const result = _controller("Solid", routes);
  return createComponent(HeadRender, { head: result.head });
}
