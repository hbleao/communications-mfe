import { fireEvent, render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Dialog } from "."

const items = [
  {
    id: "modal-1",
    mediaType: "image" as const,
    src: "https://example.com/banner-1.jpg",
    alt: "Banner 1",
    title: "Primeiro modal",
  },
  {
    id: "modal-2",
    mediaType: "video" as const,
    src: "https://example.com/video.mp4",
    title: "Segundo modal",
  },
]

describe("Dialog", () => {
  it("renderiza o dialog com a imagem e o checkbox", () => {
    const { getByRole, getByLabelText, getByAltText, getByText } = render(
      <Dialog items={items} />,
    )

    expect(getByRole("dialog")).toBeTruthy()
    expect(getByAltText("Banner 1")).toBeTruthy()
    expect(getByRole("dialog").querySelector("video")).toBeNull()
    expect(getByLabelText("Não mostrar novamente")).toBeTruthy()
    expect(getByText("1 de 2")).toBeTruthy()
  })

  it("renderiza um video quando configurado", () => {
    const { getByRole, getByText } = render(<Dialog items={items} initialIndex={1} />)

    const video = getByRole("dialog").querySelector("video")

    expect(video).toBeTruthy()
    expect(getByRole("dialog").querySelector("img")).toBeNull()
    expect(video?.getAttribute("src")).toContain("video.mp4")
    expect(getByText("2 de 2")).toBeTruthy()
  })

  it("permite marcar e desmarcar o checkbox", () => {
    const { getByLabelText } = render(<Dialog items={items} />)
    const checkbox = getByLabelText(
      "Não mostrar novamente",
    ) as HTMLInputElement

    expect(checkbox.checked).toBe(false)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })

  it("avança um modal por vez ao clicar no botão de fechar", () => {
    const { getByLabelText, queryByAltText, getByRole, getByText } = render(
      <Dialog items={items} />,
    )

    fireEvent.click(getByLabelText("Fechar"))

    expect(queryByAltText("Banner 1")).toBeNull()
    expect(getByRole("dialog").querySelector("video")).toBeTruthy()
    expect(getByText("2 de 2")).toBeTruthy()
  })

  it("avança um modal por vez ao clicar no backdrop", () => {
    const { queryByAltText, getByRole, getByText } = render(<Dialog items={items} />)

    fireEvent.click(document.body.querySelector('[class*="backdrop"]') as Element)

    expect(queryByAltText("Banner 1")).toBeNull()
    expect(getByRole("dialog").querySelector("video")).toBeTruthy()
    expect(getByText("2 de 2")).toBeTruthy()
  })

  it("fecha ao clicar em fechar no último modal", () => {
    const { getByLabelText, queryByRole } = render(
      <Dialog items={items} initialIndex={1} />,
    )

    fireEvent.click(getByLabelText("Fechar"))

    expect(queryByRole("dialog")).toBeNull()
  })

  it("fecha ao clicar no backdrop do último modal", () => {
    const { queryByRole } = render(<Dialog items={items} initialIndex={1} />)

    fireEvent.click(document.body.querySelector('[class*="backdrop"]') as Element)

    expect(queryByRole("dialog")).toBeNull()
  })
})
