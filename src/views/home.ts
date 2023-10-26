import { navigate } from "@/routes";

import "@/styles/views/home.scss";

export const home = `
    <div class="home">
        <main class="home__main">
            <h1 class="home__main__title">JSON Tree Viewer</h1>
            <p class="home__main__subtitle">
                Simple JSON Viewer that runs completely on-client. No data exchange
            </p>
            <label for="home__main__loader" class="home__main__loader__label">
                Load JSON
                <input hidden id="home__main__loader" type="file" />
            </label>
        </main>
    </div>
`;

export const setupHome = () => {
  const loader = document.querySelector<HTMLInputElement>(
    "#home__main__loader"
  )!;

  loader.addEventListener("change", async (e) => {
    if (!e.target) {
      return;
    }

    const file = (e.target as HTMLInputElement).files?.[0];

    if (!file || file.type !== "application/json") {
      return;
    }

    await file.arrayBuffer().then((buffer) => {
      const parserThread = new Worker(
        new URL("../helpers/parser-thread.ts", import.meta.url)
      );

      parserThread.onerror = () => {
        document.dispatchEvent(new CustomEvent("error"));

        parserThread.terminate();
      };

      parserThread.onmessage = ({ data }) => {
        if (data === null) {
          parserThread.terminate();

          return;
        }

        navigate("/viewer", { file });

        document.dispatchEvent(
          new CustomEvent("data", {
            detail: {
              data,
            },
          })
        );
      };

      parserThread.postMessage(
        new TextDecoder().decode(new Uint8Array(buffer))
      );

      parserThread.postMessage(null);
    });
  });

  const main = document.querySelector(".home__main")!;

  document.addEventListener("error", () => {
    const error = document.createElement("p");

    error.classList.add("home__main__error");

    error.append("Invalid file. Please load a valid JSON file.");

    main.append(error);
  });
};
