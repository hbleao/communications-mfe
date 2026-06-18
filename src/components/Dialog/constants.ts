import { DialogItem } from "./types"

const imageUrl =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1280&q=80"

export const defaultDialogItems: DialogItem[] = [
  {
    id: "default-image",
    mediaType: "image",
    src: imageUrl,
    alt: "Banner com layout promocional",
    title: "Comunicado",
  },
]
