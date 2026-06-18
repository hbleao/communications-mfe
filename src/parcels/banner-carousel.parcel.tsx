import React from "react"
import { createRoot, Root } from "react-dom/client"
import { BannerCarousel } from "../components/BannerCarousel"

export type BannerCarouselParcelProps = any & {
  domElement: HTMLElement
}

const roots = new WeakMap<HTMLElement, Root>()

export const BannerCarouselParcel = {
  bootstrap: () => Promise.resolve(),
  mount: (props: BannerCarouselParcelProps) => {
    const root = createRoot(props.domElement)
    roots.set(props.domElement, root)
    root.render(<BannerCarousel {...props} />)
    return Promise.resolve()
  },
  update: (props: BannerCarouselParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    root.render(<BannerCarousel {...props} />)
    return Promise.resolve()
  },
  unmount: (props: BannerCarouselParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    root.unmount()
    roots.delete(props.domElement)
    return Promise.resolve()
  },
}
