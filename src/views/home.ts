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
  const loader = document.querySelector<HTMLInputElement>("#home__loader")!;

  loader.addEventListener("change", (e) => {
    console.log(e);
  });
};
