import "@/styles/index.scss";

import { base, navigate } from "@/routes/index";

navigate("/");

window.addEventListener("popstate", () => {
  navigate(window.location.pathname.substring(base.length) as any);
});
