export type ThcHeadValue = string | number | boolean | null | undefined;

export interface ThcMetaElement {
  title?: string;
  [key: string]: ThcHeadValue;
}

export interface ThcLinkElement {
  rel: string;
  href: string;
  [key: string]: ThcHeadValue;
}

export interface ThcScriptElement {
  children?: string;
  [key: string]: ThcHeadValue;
}

export interface ThcStyleElement {
  children?: string;
  [key: string]: ThcHeadValue;
}

export interface ThcHead {
  meta?: ThcMetaElement[];
  links?: ThcLinkElement[];
  scripts?: ThcScriptElement[];
  styles?: ThcStyleElement[];
}
