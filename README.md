#### About
This is my version of the [rinha-frontend](https://github.com/codante-io/rinha-frontend/), a Brazilian community competition of client-side web applications focused on accessiblity and performance. It consists of an application that should render JSON files of arbitrary sizes in the smallest possible time to first interaction.

#### Implementation
- Initially, I tried to implement a single-threaded version, like a normal person. However, it quickly became clear that it would be impossible to render the _giant.json_, a 181MB file, like that, and even smaller ones were expensive.
- Therefore, I started experimenting with web workers, so I could parse the JSON file in a separate thread. It worked, but parsing was not the bottleneck. Rendering millions of bytes to the DOM (+ with different heights, since I was using the `<details>` to allow an accessible collision and expansion of nodes) was the problem.
- I then tried to implement a virtual scroll, using [hyperlist](https://github.com/tbranyen/hyperlist), to avoid writing one myself. It worked, but I had to discard the `<details>` tag and adopt a rows approach. This way, I had consistent heights for each row and the virtual scroll could work properly.
- I then tried to optimize it using a separate thread to map the rows. Altough I had an incorrect approach initially, after implementing the creation of nodes on `hyperlist.generate()` call (which happens on scroll), it made a lot more sense and I the performance improvement was clear.
- Trying to render the _giant.json_ is still a problem though. I tried implementing refreshes to the virtual scroll on batches, but it made it even slower. I may have got it wrong.

#### Instructions
To run it locally, you can:

1. Clone the repository w/ `git clone git@github.com:antoniopataro/rinha-de-frontend-2023-typescript.git`;
2. Install its dependencies w/ `npm install`;
3. Finally, run `npm run build && npm run preview` for a production preview version, which will open on your localhost at the port 3000.

#### Results
My version can render the _large.json_ in seconds, but the _giant.json_ is still expensive, taking several seconds on the rows mapper (~8s) and on the virtual scroll refresh. With a correct approach to batch refreshes or using a stream parser for JSON files seems like the best way to improve performance in this challenge.

#### Tech
- hyperlist;
- typescript;
- vite.
