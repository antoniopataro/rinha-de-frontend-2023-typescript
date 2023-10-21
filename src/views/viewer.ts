import "@/styles/views/viewer.scss";

type Props = {
  file: File;
};

export const setupViewer = ({ file }: Props) => {
  const heading = document.querySelector<HTMLHeadingElement>(
    ".viewer__header__heading"
  )!;

  heading.innerText = file.name;
};

export const viewer = `
    <div class="viewer">
        <header class="viewer__header">
            <h1 class="viewer__header__heading"></h1>
        </header>
        <main class="viewer__main">
            <div class="viewer__main__tree">
                viewer
            </div>
        </main>
    </div>
`;
