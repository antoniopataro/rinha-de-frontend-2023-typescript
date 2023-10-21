import { renderer } from "@/helpers/renderer";

import "@/styles/views/viewer.scss";

type Props = {
  file: File;
};

export const setupViewer = ({ file }: Props) => {
  const heading = document.querySelector<HTMLHeadingElement>(
    ".viewer__header__heading"
  )!;

  heading.innerText = file.name;

  const tree = document.querySelector<HTMLDivElement>(".viewer__main__tree")!;

  document.addEventListener("data", (e) => {
    const { data } = (e as CustomEvent).detail;

    console.log(data);

    let startTime = performance.now();
    renderer(data, tree);
    console.log("renderer took: ", performance.now() - startTime, "ms");
  });
};

export const viewer = `
    <div class="viewer">
        <header class="viewer__header">
            <h1 class="viewer__header__heading"></h1>
        </header>
        <main class="viewer__main">
            <div class="viewer__main__tree"></div>
        </main>
    </div>
`;
