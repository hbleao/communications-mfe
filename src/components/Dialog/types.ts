export type DialogItem = {
  id?: string
  mediaType: "image" | "video"
  src?: string
  alt?: string
  title?: string
  poster?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}

export type DialogProps = {
  items?: DialogItem[]
  initialIndex?: number
}
