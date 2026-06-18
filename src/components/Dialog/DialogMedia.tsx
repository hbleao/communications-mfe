import { DialogItem } from "./types"

type DialogMediaProps = {
  mediaItem: DialogItem
  frameClassName: string
  mediaClassName: string
}

export function DialogMedia({
  mediaItem,
  frameClassName,
  mediaClassName,
}: DialogMediaProps) {
  return (
    <div className={frameClassName}>
      {mediaItem.mediaType === "video" ? (
        <video
          className={mediaClassName}
          src={mediaItem.src}
          poster={mediaItem.poster}
          title={mediaItem.title}
          controls={mediaItem.controls ?? true}
          autoPlay={mediaItem.autoPlay ?? false}
          muted={mediaItem.muted ?? false}
          loop={mediaItem.loop ?? false}
          playsInline
        />
      ) : (
        <img
          src={mediaItem.src}
          alt={mediaItem.alt ?? "Banner com layout promocional"}
          className={mediaClassName}
          width={640}
          height={360}
        />
      )}
    </div>
  )
}
