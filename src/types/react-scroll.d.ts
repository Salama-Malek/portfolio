declare module "react-scroll" {
  import { ComponentType, ReactNode } from "react";

  interface LinkProps {
    to: string;
    spy?: boolean;
    smooth?: boolean | string;
    offset?: number;
    duration?: number | ((deltaTime: number) => number);
    delay?: number;
    isDynamic?: boolean;
    onSetActive?: () => void;
    onSetInactive?: () => void;
    activeClass?: string;
    className?: string;
    style?: Record<string, unknown>;
    children?: ReactNode;
    [key: string]: unknown;
  }

  interface ScrollProps {
    to?: string;
    smooth?: boolean | string;
    offset?: number;
    duration?: number | ((deltaTime: number) => number);
    delay?: number;
    spy?: boolean;
    isDynamic?: boolean;
    onSetActive?: () => void;
    onSetInactive?: () => void;
    className?: string;
    style?: Record<string, unknown>;
    hashSpy?: boolean;
    [key: string]: unknown;
  }

  export const Link: ComponentType<LinkProps>;
  export const Button: ComponentType<ScrollProps>;
  export const Element: ComponentType<{
    name: string;
    children?: ReactNode;
    [key: string]: unknown;
  }>;
  export const scroller: {
    scrollTo(target: string | number, options?: ScrollProps): void;
  };
}
