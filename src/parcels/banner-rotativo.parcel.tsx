import React from "react"
import { createRoot, Root } from "react-dom/client"
import { BannerRotativo, BannerRotativoProps } from "../components/bannerCarousel"

export type BannerRotativoParcelProps = BannerRotativoProps & {
  domElement: HTMLElement
}

const roots = new WeakMap<HTMLElement, Root>()

export const bannerRotativoParcel = {
  bootstrap: () => Promise.resolve(),
  mount: (props: BannerRotativoParcelProps) => {
    const root = createRoot(props.domElement)
    roots.set(props.domElement, root)
    root.render(<BannerRotativo {...props} />)
    return Promise.resolve()
  },
  update: (props: BannerRotativoParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    root.render(<BannerRotativo {...props} />)
    return Promise.resolve()
  },
  unmount: (props: BannerRotativoParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    root.unmount()
    roots.delete(props.domElement)
    return Promise.resolve()
  },
}
