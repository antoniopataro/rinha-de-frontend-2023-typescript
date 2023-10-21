const parentPrefix = "viewer__main";
const prefix = "viewer__main__tree";

const renderBoolean = (data: any, target: HTMLElement): void => {
  const boolean = document.createElement("span");

  boolean.classList.add(`${prefix}__value`);

  boolean.innerText = (data as boolean).toString();

  target.appendChild(boolean);
};

const renderNumber = (data: any, target: HTMLElement): void => {
  const number = document.createElement("span");

  number.classList.add(`${prefix}__value`);

  number.innerText = (data as number).toString();

  target.appendChild(number);
};

const renderString = (data: any, target: HTMLElement): void => {
  const string = document.createElement("span");

  string.classList.add(`${prefix}__value-string`);

  string.innerText = data;

  target.appendChild(string);
};

export const renderer = (data: any, target: HTMLElement) => {
  if (typeof data === "boolean") {
    renderBoolean(data, target);

    return;
  }

  if (typeof data === "number") {
    renderNumber(data, target);

    return;
  }

  if (typeof data === "object") {
    if (data === null) {
      const value = document.createElement("span");

      value.classList.add(`${prefix}__value`);

      value.innerText = "null";

      target.appendChild(value);

      return;
    }

    // also keep track of the number of children for ::before line
    if (Array.isArray(data)) {
      target.classList.add(`${prefix}__node--array`);

      data.forEach((v, i) => {
        const node = document.createElement("div"); // old details

        node.classList.add(`${prefix}__node`);
        node.classList.add(`${prefix}__value`);

        if (
          !(
            target.parentElement &&
            target.parentElement.className === parentPrefix
          )
        ) {
          node.classList.add(`${prefix}__value--children`);
        }

        const index = document.createElement("span"); // old summary should be clickable to collapse and expand children if typeof v === object and !!v

        index.innerText = `${i.toString()}: `;

        index.classList.add(`${prefix}__node--array--index`);

        node.appendChild(index);

        renderer(v, node);

        target.appendChild(node);
      });

      return;
    }

    Object.entries(data).forEach(([k, v]) => {
      const node = document.createElement("div"); // old details

      node.classList.add(`${prefix}__node`);
      node.classList.add(`${prefix}__value`);

      if (
        typeof target === "object" &&
        !(
          target.parentElement &&
          target.parentElement.className === parentPrefix
        )
      ) {
        node.classList.add(`${prefix}__value--children`);
      }

      let closingToken: string | undefined;

      const key = document.createElement("span"); // old summary should be clickable to collapse and expand children if typeof v === object and !!v

      key.classList.add(`${prefix}__node--object--key`);

      key.innerText = `${k}: `;

      const value = document.createElement(
        typeof v === "object" && !!v ? "div" : "span"
      );

      value.classList.add(`${prefix}__node__value`);

      if (typeof v === "object" && !!v) {
        const token = document.createElement("span");

        token.classList.add(`${prefix}__node--object--token`);

        if (Array.isArray(v)) {
          token.innerText = "[";

          closingToken = "]";

          key.appendChild(token);
        } else {
          token.innerText = "{";

          closingToken = "}";

          key.appendChild(token);
        }
      }

      renderer(v, value);

      node.appendChild(key);
      node.appendChild(value);

      if (closingToken) {
        const token = document.createElement("span");
        token.classList.add("token");

        token.innerText = closingToken;

        node.appendChild(token);
      }

      target.appendChild(node);
    });
  }

  if (typeof data === "string") {
    renderString(data, target);

    return;
  }
};
