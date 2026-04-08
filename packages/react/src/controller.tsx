import { useRouterState } from "@tanstack/react-router";
import { _controller } from "@thcjs/core";
import { HeadRender } from "./render.js";

export function HeadController() {
  const routes = useRouterState({ select: (s) => s.matches });
  const result = _controller("React", routes);
  return <HeadRender head={result.head} />;
}
