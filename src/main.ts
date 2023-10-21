import "@/styles/index.scss";

import "@/styles/templates/index.scss";

import { home } from "@/templates/home";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = home;
