import { act, fireEvent, render } from "@testing-library/react"

import { BannerRotativo } from "."

describe("BannerRotativo", () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it("renderiza dots e navega com setas", () => {
    const slides = [
      { id: "s1", title: "Slide 1" },
      { id: "s2", title: "Slide 2" },
      { id: "s3", title: "Slide 3" },
    ]

    const { getByLabelText, getAllByRole } = render(
      <BannerRotativo slides={slides} autoplay={false} />,
    )

    const tabs = getAllByRole("tab")
    expect(tabs).toHaveLength(3)
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")

    fireEvent.click(getByLabelText("Próximo"))

    const tabsAfter = getAllByRole("tab")
    expect(tabsAfter[1]).toHaveAttribute("aria-selected", "true")
  })

  it("troca o slide automaticamente quando autoplay está ativo", () => {
    jest.useFakeTimers()

    const slides = [
      { id: "s1", title: "Slide 1" },
      { id: "s2", title: "Slide 2" },
    ]

    const { getAllByRole } = render(
      <BannerRotativo slides={slides} autoplay intervalMs={500} />,
    )

    expect(getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true")

    act(() => {
      jest.advanceTimersByTime(600)
    })

    expect(getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true")
  })

  it("pausa o autoplay ao passar o mouse por cima", () => {
    jest.useFakeTimers()

    const slides = [
      { id: "s1", title: "Slide 1" },
      { id: "s2", title: "Slide 2" },
    ]

    const { getByRole, getAllByRole } = render(
      <BannerRotativo slides={slides} autoplay intervalMs={400} />,
    )

    expect(getAllByRole("tab")[0]).toHaveAttribute("aria-selected", "true")

    act(() => {
      jest.advanceTimersByTime(450)
    })
    expect(getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true")

    fireEvent.mouseEnter(getByRole("region"))

    act(() => {
      jest.advanceTimersByTime(1200)
    })

    expect(getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true")
  })
})
