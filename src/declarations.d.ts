declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.module.sass" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.scss" {
  const css: string;
  export default css;
}

declare module "*.sass" {
  const css: string;
  export default css;
}

declare module "react-dom/client" {
  export type Root = {
    render(children: any): void;
    unmount(): void;
  };

  export function createRoot(
    container: Element | DocumentFragment,
    options?: any,
  ): Root;
}
