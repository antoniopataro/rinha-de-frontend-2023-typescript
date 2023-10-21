import "@/styles/index.css";

import "@/styles/templates/index.css";

import { home } from "@/templates/home";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = home;
