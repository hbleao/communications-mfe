import React, { useState } from "react"

import { Modal } from "."

export default {
  title: "Components/Modal",
}

export const Padrao = () => {
  const [open, setOpen] = useState(true)

  return (
    <div style={{ padding: 20 }}>
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

      <Modal
        open={open}
        title="Modal (SCSS)"
        onClose={() => setOpen(false)}
        primaryAction={{
          label: "Salvar",
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: "Cancelar",
          onClick: () => setOpen(false),
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <div>Fecha com ESC e clique no backdrop.</div>
          <div>O foco fica preso dentro do modal enquanto estiver aberto.</div>
        </div>
      </Modal>
    </div>
  )
}

export const Tamanhos = () => {
  const [open, setOpen] = useState<null | "sm" | "md" | "lg">("sm")

  return (
    <div style={{ padding: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
      <button type="button" onClick={() => setOpen("sm")}>
        sm
      </button>
      <button type="button" onClick={() => setOpen("md")}>
        md
      </button>
      <button type="button" onClick={() => setOpen("lg")}>
        lg
      </button>

      <Modal
        open={open !== null}
        title={`Modal size: ${open ?? ""}`}
        size={open ?? "md"}
        onClose={() => setOpen(null)}
        primaryAction={{
          label: "Fechar",
          onClick: () => setOpen(null),
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <div>Use os botões para alternar o size.</div>
        </div>
      </Modal>
    </div>
  )
}

