import { fireEvent, render } from "@testing-library/react"

import { Modal } from "."

describe("Modal", () => {
  it("não renderiza quando open=false", () => {
    const onClose = jest.fn()
    const { queryByRole } = render(
      <Modal open={false} onClose={onClose}>
        Conteúdo
      </Modal>,
    )

    expect(queryByRole("dialog")).toBeNull()
  })

  it("renderiza e fecha pelo botão", () => {
    const onClose = jest.fn()
    const { getByRole, getByLabelText } = render(
      <Modal open onClose={onClose} title="Título">
        Conteúdo
      </Modal>,
    )

    expect(getByRole("dialog")).toBeInTheDocument()
    fireEvent.click(getByLabelText("Fechar"))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("fecha com ESC", () => {
    const onClose = jest.fn()
    render(
      <Modal open onClose={onClose} title="Título">
        Conteúdo
      </Modal>,
    )

    fireEvent.keyDown(window, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("fecha ao clicar no backdrop", () => {
    const onClose = jest.fn()
    render(
      <Modal open onClose={onClose} title="Título">
        Conteúdo
      </Modal>,
    )

    const backdrop = document.querySelector(".backdrop")
    expect(backdrop).not.toBeNull()
    fireEvent.mouseDown(backdrop as Element)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

