import { createRoot, Root } from "react-dom/client"
import { Dialog, DialogProps } from "../components/Dialog"

export type DialogParcelProps = DialogProps & {
  domElement: HTMLElement
}

const roots = new WeakMap<HTMLElement, Root>()

export const dialogParcel = {
  bootstrap: () => Promise.resolve(),
  mount: (props: DialogParcelProps) => {
    const root = createRoot(props.domElement)
    roots.set(props.domElement, root)
    const { domElement: _domElement, ...dialogProps } = props
    root.render(<Dialog {...dialogProps} />)
    return Promise.resolve()
  },
  update: (props: DialogParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    const { domElement: _domElement, ...dialogProps } = props
    root.render(<Dialog {...dialogProps} />)
    return Promise.resolve()
  },
  unmount: (props: DialogParcelProps) => {
    const root = roots.get(props.domElement)
    if (!root) return Promise.resolve()
    root.unmount()
    roots.delete(props.domElement)
    return Promise.resolve()
  },
}
