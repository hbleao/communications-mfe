import React, { useMemo, useState } from "react"

import { Modal } from "./components/modal"
import { BannerRotativo } from "./components/bannerCarousel"

export default function Root(props: { name?: string }) {
  const [open, setOpen] = useState(false)

  const slides = useMemo(
    () => [
      {
        id: "s1",
        title: "Comunicação que converte",
        description: "Banner rotativo com autoplay, setas e dots (SCSS).",
        ctaLabel: "Abrir modal",
        onCtaClick: () => setOpen(true),
        background: { from: "#0ea5e9", to: "#6366f1" },
      },
      {
        id: "s2",
        title: "Layouts modernos",
        description: "Glassmorphism + transições suaves, respeitando reduced motion.",
        ctaLabel: "Ver detalhes",
        onCtaClick: () => setOpen(true),
        background: { from: "#22c55e", to: "#0ea5e9" },
      },
      {
        id: "s3",
        title: "Parcels prontos p/ host",
        description: "Você usa via single-spa Parcel no app host.",
        ctaLabel: "Como integrar",
        onCtaClick: () => setOpen(true),
        background: { from: "#f97316", to: "#ef4444" },
      },
    ],
    [],
  )

  return (
    <section>
      <div style={{ fontSize: 14, marginBottom: 12, color: "#0f172a" }}>
        {props.name ? `${props.name} (standalone)` : "@porto/communication-mfe"}
      </div>

      <div style={{ width: "100%" }}>
        <BannerRotativo slides={slides} autoplay intervalMs={4500} />

        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid rgba(148, 163, 184, 0.6)",
              background: "rgba(255, 255, 255, 0.9)",
              color: "#0f172a",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Abrir modal
          </button>
        </div>
      </div>

      <Modal
        open={open}
        title="Modal (SCSS)"
        onClose={() => setOpen(false)}
        primaryAction={{
          label: "Entendi",
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: "Fechar",
          onClick: () => setOpen(false),
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <div>
            Esse modal fecha com ESC, clique no backdrop e mantém o foco preso
            enquanto estiver aberto.
          </div>
          <div>
            Para ver isso sem criar uma página no app host, use o modo standalone
            do MFE.
          </div>
        </div>
      </Modal>
    </section>
  )
}
