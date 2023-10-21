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

    navigate("/viewer", { file });

    await file.arrayBuffer().then((buffer) => {
      let data: any;

      try {
        let startTime = performance.now();
        data = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer)));
        console.log("parse took: ", performance.now() - startTime, "ms");
      } catch (error) {
        return;
      }

      document.dispatchEvent(
        new CustomEvent("data", {
          detail: {
            data,
          },
        })
      );
    });
  });
};
