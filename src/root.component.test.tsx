import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("./components/BannerCarousel", () => {
  return {
    BannerCarousel: () => <div data-testid="banner-carousel" />,
  }
})

import Root from "./root.component"

describe("Root component", () => {
  it("renderiza o standalone com o dialog", () => {
    const { getByText, getByRole } = render(<Root name="Testapp" />)

    expect(getByText(/Testapp \(standalone\)/i)).toBeTruthy()
    expect(getByRole("dialog")).toBeTruthy()
    expect(getByText(/Não mostrar novamente/i)).toBeTruthy()
  })
})
