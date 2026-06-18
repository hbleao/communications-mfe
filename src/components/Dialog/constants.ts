import { DialogItem } from "./types"

const imageUrl =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1280&q=80"
const secondImageUrl =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1280&q=80"
const videoUrl =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"

export const defaultDialogItems: DialogItem[] = [
  {
    id: "default-image-1",
    mediaType: "image",
    src: imageUrl,
    alt: "Banner inicial do comunicado",
    title: "Comunicado inicial",
  },
  {
    id: "default-video",
    mediaType: "video",
    src: videoUrl,
    title: "Video do comunicado",
    muted: true,
    poster: imageUrl,
  },
  {
    id: "default-image-2",
    mediaType: "image",
    src: secondImageUrl,
    alt: "Banner final do comunicado",
    title: "Comunicado final",
  },
]
