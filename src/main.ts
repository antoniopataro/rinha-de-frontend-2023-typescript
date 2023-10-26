import "@/styles/index.scss";

import { navigate } from "@/routes/index";

navigate("/");

window.addEventListener("popstate", () => {
  window.location.reload();
});
