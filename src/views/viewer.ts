import "@/styles/views/viewer.scss";

import Hyperlist from "hyperlist";

const setupHeader = ({ fileName }: { fileName: string }) => {
  const heading = document.querySelector<HTMLHeadingElement>(
    ".viewer__header__heading"
  )!;

  heading.innerText = fileName;
};

const setupHyperlist = ({ tree }: { tree: HTMLDivElement }) => {
  const hyperlist = Hyperlist.create(tree, {
    generate: (_: number) => ({
      element: document.createElement("div"),
      height: 28.23,
    }),
    itemHeight: 28.23,
    total: 1,
  });

  return hyperlist;
};

const setupRendererThread = ({
  hyperlist,
  tree,
}: {
  hyperlist: typeof Hyperlist;
  tree: HTMLDivElement;
}) => {
  const prefix = tree.className;

  const rendererThread = new Worker(
    new URL("../helpers/renderer-thread.ts", import.meta.url)
  );

  rendererThread.onmessage = ({
    data,
  }: {
    data: {
      depth: number;
      key?: string;
      value: string;
    }[];
  }) => {
    if (data === null) {
      rendererThread.terminate();

      return;
    }

    const rows = data;

    hyperlist.refresh(tree, {
      generate: (index: number) => {
        const { depth, key, value } = rows[index];

        const node = document.createElement(key ? "div" : "span");

        node.classList.add(`${prefix}__node`);

        for (let i = 0; i < depth; i++) {
          const spacer = document.createElement("span");

          spacer.classList.add(`${prefix}__node__spacer`);

          node.append(spacer);
        }

        if (key) {
          const knode = document.createElement("span");

          knode.classList.add(
            !isNaN(parseFloat(key))
              ? `${prefix}__node__index`
              : `${prefix}__node__key`
          );

          knode.append(key);

          node.append(knode);
        }

        const vnode = document.createElement("span");

        vnode.classList.add(`${prefix}__node__value`);

        vnode.append(value);

        node.append(vnode);

        return {
          element: node,
          height: 28.23,
        };
      },
      itemHeight: 28.23,
      total: rows.length,
    });
  };

  return rendererThread;
};

export const setupViewer = ({ file }: { file: File }) => {
  setupHeader({ fileName: file.name });

  const tree = document.querySelector<HTMLDivElement>(".viewer__main__tree")!;

  const hyperlist = setupHyperlist({ tree });

  const rendererThread = setupRendererThread({
    hyperlist,
    tree,
  });

  document.addEventListener("data", (e) => {
    const { data } = (e as CustomEvent).detail;

    rendererThread.postMessage(data);
    rendererThread.postMessage(null);
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
