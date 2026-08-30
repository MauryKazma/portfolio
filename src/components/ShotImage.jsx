import { rasterWebpSrc } from "../utils/image"

export default function ShotImage({
  src,
  alt,
  width,
  height,
  sizes,
  eager = false,
  className,
  draggable,
  onLoad,
}) {
  const webp = rasterWebpSrc(src)
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={webp ? undefined : className}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      draggable={draggable}
      onLoad={onLoad}
    />
  )

  if (!webp) return img

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      {img}
    </picture>
  )
}
