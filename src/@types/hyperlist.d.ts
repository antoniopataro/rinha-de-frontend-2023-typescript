declare module "hyperlist" {
  export default class HyperList {
    static create(
      container: HTMLElement,
      options: {
        generate: (index: number) => any;
        height?: number;
        itemHeight: number;
        total: number;
      }
    ): typeof HyperList;
    static refresh(
      container: HTMLElement,
      options: {
        generate: (index: number) => any;
        height?: number;
        itemHeight: number;
        total: number;
      }
    ): any;
  }
}
