import { home, setupHome } from "@/views/home";
import { setupViewer, viewer } from "@/views/viewer";

const app = document.querySelector<HTMLDivElement>("#app")!;

export const base = "/rinha-de-frontend-2023-typescript";

const routes = {
  "/": {
    setupView: setupHome,
    view: home,
  },
  "/viewer": {
    setupView: setupViewer,
    view: viewer,
  },
};

export const navigate = <R extends keyof typeof routes>(
  route: R,
  props?: Parameters<(typeof routes)[R]["setupView"]>[0]
) => {
  if (!(route in routes)) {
    console.error(`route ${route} not found`);
    route = "/" as R;

    return;
  }

  window.history.pushState(null, "", base + route);

  const { setupView, view } = routes[route];

  app.innerHTML = view;

  setupView(props as any);
};
