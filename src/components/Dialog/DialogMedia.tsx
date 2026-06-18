import { DialogItem } from "./types"

type DialogMediaProps = {
  item: DialogItem
  frameClassName: string
  mediaClassName: string
}

export function DialogMedia({
  item,
  frameClassName,
  mediaClassName,
}: DialogMediaProps) {
  return (
    <div className={frameClassName}>
      {item.mediaType === "video" ? (
        <video
          className={mediaClassName}
          src={item.src}
          poster={item.poster}
          title={item.title}
          controls={item.controls ?? true}
          autoPlay={item.autoPlay ?? false}
          muted={item.muted ?? false}
          loop={item.loop ?? false}
          playsInline
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt ?? "Banner com layout promocional"}
          className={mediaClassName}
          width={640}
          height={360}
        />
      )}
    </div>
  )
}
