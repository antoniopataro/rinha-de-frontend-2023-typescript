import { Renderer } from "@/helpers/renderer";

import "@/styles/views/viewer.scss";

import HyperList from "hyperlist";

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

    const target = document.createElement("div");

    target.classList.add("viewer__main__tree");

    const renderer = new Renderer(target);

    let startTime = performance.now();
    renderer.recursive(data);
    console.log("renderer took: ", performance.now() - startTime, "ms");

    const elements = Array.from(target.childNodes);

    const hyperListConfig = {
      generate(index: number) {
        return {
          element: elements[index],
          height: 28.23,
        };
      },
      itemHeight: 28.23,
      total: elements.length,
    };

    startTime = performance.now();
    HyperList.create(tree, hyperListConfig);
    console.log("hyperlist took: ", performance.now() - startTime, "ms");
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
