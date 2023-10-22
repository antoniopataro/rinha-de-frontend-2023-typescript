export class Renderer {
  private current?: HTMLElement;
  private depth: number = 0;
  private readonly prefix: string;
  private readonly target: HTMLElement;

  constructor(target: HTMLElement) {
    this.prefix = target.className;
    this.target = target;
  }

  private shouldRenderInTheSameLine(data: any): boolean {
    if (data === null) {
      return true;
    }

    if (["boolean", "number", "string"].includes(typeof data)) {
      return true;
    }

    return false;
  }

  public recursive(data: any, target?: HTMLElement): void {
    if (typeof data === "boolean") {
      this.renderBoolean(data, target ?? this.target);

      return;
    }

    if (typeof data === "number") {
      this.renderNumber(data, target ?? this.target);

      return;
    }

    if (typeof data === "string") {
      this.renderString(data, target ?? this.target);

      return;
    }

    if (typeof data === "object") {
      if ((target ?? this.target).childNodes.length !== 0) {
        this.depth++;
      }

      this.renderObject(data, target ?? this.target);

      if ((target ?? this.target).childNodes.length !== 0) {
        this.depth--;
      }

      return;
    }

    return;
  }

  private renderBoolean(data: any, target: HTMLElement): void {
    const value = document.createElement("span");

    value.classList.add(`${this.prefix}__value--boolean`);

    value.innerText = (data as boolean).toString();

    target.append(value);
  }

  private renderNumber(data: any, target: HTMLElement): void {
    const value = document.createElement("span");

    value.classList.add(`${this.prefix}__value--number`);

    value.innerText = (data as number).toString();

    target.append(value);
  }

  private renderObject(data: any, target: HTMLElement): void {
    if (data === null) {
      const value = document.createElement("span");

      value.classList.add(`${this.prefix}__value`);

      value.innerText = "null";

      target.appendChild(value);

      return;
    }

    if (Array.isArray(data)) {
      if (this.current) {
        this.current.setAttribute("data-children", data.length.toString());
        this.current.setAttribute("tabindex", "0");
      }

      data.forEach((v, i) => {
        const node = document.createElement("div");

        node.classList.add(`${this.prefix}__padstart`);

        node.style.width = `calc(100% - ${this.depth * 32}px)`;
        node.style.zIndex = this.target.childNodes.length.toString();

        const index = document.createElement("span");

        index.innerText = `${i.toString()}: `;

        node.append(index);

        target.append(node);

        if (this.shouldRenderInTheSameLine(v)) {
          this.recursive(v, node);
        } else {
          node.classList.add(`${this.prefix}__children`);

          this.current = node;

          this.recursive(v);
        }
      });

      return;
    }

    const entries = Object.entries(data);

    if (this.current) {
      this.current.setAttribute("data-children", entries.length.toString());
      this.current.setAttribute("tabindex", "0");
    }

    entries.forEach(([k, v]) => {
      const node = document.createElement("div");

      node.classList.add(`${this.prefix}__padstart`);

      node.style.width = `calc(100% - ${this.depth * 32}px)`;

      node.style.zIndex = this.target.childNodes.length.toString();

      const key = document.createElement("span");

      key.classList.add(`${this.prefix}__key`);

      key.innerText = `${k}: `;

      node.append(key);

      let closingToken: string | undefined;

      target.append(node);

      if (this.shouldRenderInTheSameLine(v)) {
        this.recursive(v, node);
      } else {
        node.classList.add(`${this.prefix}__children`);

        this.current = node;

        const token = document.createElement("span");

        token.classList.add(`${this.prefix}__token`);

        if (Array.isArray(v)) {
          token.innerText = "[";

          closingToken = "]";

          node.appendChild(token);
        } else {
          token.innerText = "{";

          closingToken = "}";

          node.appendChild(token);
        }

        this.recursive(v);
      }

      if (closingToken) {
        const token = document.createElement("div");

        token.classList.add(`${this.prefix}__padstart`);
        token.classList.add(`${this.prefix}__token`);

        token.style.width = `calc(100% - ${this.depth * 32}px)`;
        token.style.zIndex = this.target.childNodes.length.toString();

        token.innerText = closingToken;

        target.append(token);
      }
    });
  }

  private renderString(data: any, target: HTMLElement): void {
    const value = document.createElement("span");

    value.classList.add(`${this.prefix}__value--string`);

    value.innerText = data;

    target.append(value);
  }
}
