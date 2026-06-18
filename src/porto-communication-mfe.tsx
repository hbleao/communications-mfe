import React from "react"
import * as ReactDOMClient from "react-dom/client"
import singleSpaReact from "single-spa-react"

import Root from "./root.component"

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary: (err) => {
    return (
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>
          Ocorreu um erro no @porto/communication-mfe
        </div>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {String(err instanceof Error ? err.stack || err.message : err)}
        </pre>
      </div>
    )
  },
})

export const bootstrap = lifecycles.bootstrap
export const mount = lifecycles.mount
export const unmount = lifecycles.unmount
export const update = lifecycles.update

export { BannerCarouselParcel } from "./parcels/banner-carousel.parcel"
export { dialogParcel } from "./parcels/modal.parcel"
export type { DialogParcelProps } from "./parcels/modal.parcel"
