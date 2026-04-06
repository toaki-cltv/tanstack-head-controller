import { useRouterState } from "@tanstack/react-router";
import { _controller } from "@thcjs/core";
import { HeadRender } from "./render";

export function HeadController() {
  const routes = useRouterState({ select: (s) => s.matches });
  const result = _controller("React", routes);
  return <HeadRender head={result.head} />;
}
