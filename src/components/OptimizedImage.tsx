import React, { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "loading" | "width" | "height"
> {
  src?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  className?: string;
  loading?: "lazy" | "eager";
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  style?: React.CSSProperties;
  fetchpriority?: "high" | "low" | "auto";
  sources?: Array<{
    srcSet: string;
    type?: string;
    media?: string;
    sizes?: string;
  }>;
}

/**
 * OptimizedImage Component - Enforces dimensions and lazy loading
 * Prevents CLS by reserving layout space
 * Supports responsive images
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  className = "",
  loading = "lazy",
  onLoad,
  style = {},
  sources = [],
  ...props
}: OptimizedImageProps): JSX.Element => {
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    onLoad?.(e);
  };

  // Calculate aspect ratio padding for responsive containers
  const paddingBottom = aspectRatio ? (1 / aspectRatio) * 100 : null;

  const containerStyle: React.CSSProperties = {
    ...style,
    width: width || "100%",
    height: height as React.CSSProperties["height"],
    position: "relative",
    overflow: "hidden",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "block",
    // objectFit: "cover",
    objectPosition: "center",
  };

  const renderImage = (extraStyles: React.CSSProperties = {}): JSX.Element => {
    const imgElement = (
      <img
        src={src}
        alt={alt}
        width={width as number | undefined}
        height={height as number | undefined}
        loading={loading}
        onLoad={handleLoad}
        style={{ ...imgStyle, ...extraStyles }}
        className={className}
        {...props}
      />
    );

    if (!sources.length) {
      return imgElement;
    }

    return (
      <picture>
        {sources.map((source, index) => (
          <source
            key={`${source.srcSet}-${index}`}
            srcSet={source.srcSet}
            type={source.type}
            media={source.media}
            sizes={source.sizes}
          />
        ))}
        {imgElement}
      </picture>
    );
  };

  // Use aspect ratio container for flexible sizing
  if (aspectRatio && !height) {
    return (
      <div
        style={{
          ...containerStyle,
          paddingBottom: `${paddingBottom}%`,
          height: "auto",
        }}
        className={className}
      >
        {renderImage({
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        })}
      </div>
    );
  }

  // Fixed dimensions
  return renderImage();
};

export default OptimizedImage;
