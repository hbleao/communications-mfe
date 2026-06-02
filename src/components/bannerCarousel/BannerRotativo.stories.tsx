import React, { useMemo } from "react"

import { BannerRotativo } from "."

export default {
  title: "Parcels/BannerRotativo",
}

export const Padrao = () => {
  const slides = useMemo(
    () => [
      {
        id: "s1",
        title: "Comunicação que converte",
        description: "Autoplay, setas e dots com SCSS.",
        ctaLabel: "Saiba mais",
        background: { from: "#0ea5e9", to: "#6366f1" },
      },
      {
        id: "s2",
        title: "Layouts modernos",
        description: "Transições suaves e glassmorphism.",
        ctaLabel: "Ver detalhes",
        background: { from: "#22c55e", to: "#0ea5e9" },
      },
      {
        id: "s3",
        title: "Pronto para o host",
        description: "Use como Parcel via single-spa.",
        ctaLabel: "Integrar",
        background: { from: "#f97316", to: "#ef4444" },
      },
    ],
    [],
  )

  return (
    <div style={{ padding: 20, width: "100%" }}>
      <BannerRotativo slides={slides} autoplay intervalMs={4500} />
    </div>
  )
}

export const SemAutoplay = () => {
  const slides = useMemo(
    () => [
      {
        id: "s1",
        title: "Sem autoplay",
        description: "Navegue pelas setas/dots.",
        background: { from: "#111827", to: "#2563eb" },
      },
      {
        id: "s2",
        title: "Segundo slide",
        description: "Demonstração de estados.",
        background: { from: "#7c3aed", to: "#db2777" },
      },
    ],
    [],
  )

  return (
    <div style={{ padding: 20, width: "100%" }}>
      <BannerRotativo slides={slides} autoplay={false} />
    </div>
  )
}
