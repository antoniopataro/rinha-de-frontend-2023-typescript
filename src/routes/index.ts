import { home, setupHome } from "@/views/home";
import { setupViewer, viewer } from "@/views/viewer";

const app = document.querySelector<HTMLDivElement>("#app")!;

const routes = {
  "/": {
    setupView: setupHome,
    view: home,
  },
  "/viewer": {
    setupView: setupViewer,
    view: viewer,
  },
} as const;

export const navigate = (route: keyof typeof routes) => {
  if (!(route in routes)) {
    console.error(`route ${route} not found`);
    route = "/";

    return;
  }

  window.history.pushState(null, "", route);

  const { setupView, view } = routes[route];

  app.innerHTML = view;

  setupView();
};
