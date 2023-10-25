type Row = {
  depth: number;
  key?: string;
  value: string;
};

class Renderer {
  private depth: number = 0;
  public rows: Row[] = [];

  private recursive(value: any, key?: string) {
    if (typeof value === "number") {
      this.renderNumber(value, key);
    }

    if (typeof value === "object") {
      this.rows.push({
        depth: this.depth,
        key,
        value: Array.isArray(value) ? "[" : "{",
      } as Row);

      this.depth++;

      this.renderObject(value, key);

      this.depth--;

      this.rows.push({
        depth: this.depth,
        value: Array.isArray(value) ? "]" : "}",
      } as Row);
    }

    if (typeof value === "string") {
      this.renderString(value, key);
    }
  }

  public render(value: any) {
    this.renderObject(value);
  }

  private renderArray(value: any[]) {
    value.forEach((v, i) => {
      this.recursive(v, i.toString());
    });
  }

  private renderNull(key?: string) {
    if (!key) {
      throw new Error("tried to render null with an undefined key");
    }

    this.rows.push({
      depth: this.depth,
      key,
      value: "null",
    } as Row);
  }

  private renderNumber(value: number, key?: string) {
    if (!key) {
      throw new Error("tried to render number with an undefined key");
    }

    this.rows.push({
      depth: this.depth,
      key,
      value: value.toString(),
    } as Row);
  }

  private renderObject(value: any, key?: string) {
    if (value === null) {
      this.renderNull(key);

      return;
    }

    if (Array.isArray(value)) {
      this.renderArray(value);

      return;
    }

    Object.entries(value).forEach(([k, v]) => {
      this.recursive(v, k);
    });
  }

  private renderString(value: string, key?: string) {
    if (!key) {
      throw new Error("tried to render string with an undefined key");
    }

    this.rows.push({
      depth: this.depth,
      key: key,
      value: `"${value}"`,
    } as Row);
  }
}

let renderer: Renderer | undefined;
let startTime = 0;

onmessage = ({ data }) => {
  if (data === null) {
    postMessage(null);
    console.log("renderer took: ", performance.now() - startTime, "ms");

    return;
  }

  if (startTime === 0) {
    startTime = performance.now();
  }

  if (!renderer) {
    renderer = new Renderer();
  }

  renderer.render(data);

  postMessage(renderer.rows);
};
