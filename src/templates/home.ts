import "@/styles/templates/home.scss";

export const home = `
    <main class="container">
        <div class="home">
            <h1 class="home__title">JSON Tree Viewer</h1>
            <p class="home__subtitle">
                Simple JSON Viewer that runs completely on-client. No data exchange
            </p>
            <label for="home__loader" class="home__loader__label">
                Load JSON
                <input hidden id="home__loader" type="file" />
            </label>
        </div>
    </main>
`;
