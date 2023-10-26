onmessage = ({ data }) => {
  if (data === null) {
    postMessage(null);

    return;
  }

  let startTime = performance.now();
  postMessage(JSON.parse(data));
  console.log("parse took: " + (performance.now() - startTime) + "ms");
};
