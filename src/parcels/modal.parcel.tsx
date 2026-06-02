import React from "react"
import { createRoot, Root } from "react-dom/client"
import { Modal, ModalProps } from "../components/modal"

export type ModalParcelProps = ModalProps & {
  domElement: HTMLElement
}

const roots = new WeakMap<HTMLElement, Root>()

export const modalParcel = {
  bootstrap: () => Promise.resolve(),
  mount: (props: ModalParcelProps) => {
    const root = createRoot(props.domElement)
    roots.set(props.domElement, root)
    root.render(<Modal {...props} />)
    return Promise.resolve()
  },
  update: (props: ModalParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    root.render(<Modal {...props} />)
    return Promise.resolve()
  },
  unmount: (props: ModalParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    root.unmount()
    roots.delete(props.domElement)
    return Promise.resolve()
  },
}
