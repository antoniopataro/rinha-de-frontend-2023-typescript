onmessage = ({ data }) => {
  if (data === null) {
    postMessage(null);

    return;
  }

  postMessage(JSON.parse(data));
};
