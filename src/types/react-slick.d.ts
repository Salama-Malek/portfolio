declare module "react-slick" {
  import { ComponentType, ReactNode } from "react";

  interface Settings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    afterChange?: (index: number) => void;
    appendDots?: (dots: ReactNode) => ReactNode;
    arrows?: boolean;
    asNavFor?: React.ComponentType<Settings>;
    autoplay?: boolean;
    autoplaySpeed?: number;
    beforeChange?: (index: number, nextIndex: number) => void;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    cssEase?: string;
    customPaging?: (index: number) => ReactNode;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: "ondemand" | "progressive";
    nextArrow?: ReactNode;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    prevArrow?: ReactNode;
    responsive?: Array<{
      breakpoint: number;
      settings: Settings | "unslick";
    }>;
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
    [key: string]: unknown;
  }

  interface SlickProps extends Settings {
    children?: ReactNode;
  }

  const Slider: ComponentType<SlickProps>;
  export default Slider;
  export { Slider };
}
