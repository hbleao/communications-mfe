import { fireEvent, render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("embla-carousel-react", async () => {
  const React = await import("react")

  const useEmblaCarousel = (options?: { loop?: boolean }) => {
    const listenersRef = React.useRef<Record<string, Array<(api: any) => void>>>(
      {},
    )
    const stateRef = React.useRef({ index: 0, count: 0 })
    const [, forceRender] = React.useState(0)
    const apiRef = React.useRef<any>(null)

    if (!apiRef.current) {
      const emit = (eventName: string) => {
        listenersRef.current[eventName]?.forEach((listener) =>
          listener(apiRef.current),
        )
      }

      apiRef.current = {
        on: (eventName: string, listener: (api: any) => void) => {
          listenersRef.current[eventName] ||= []
          listenersRef.current[eventName].push(listener)
          return apiRef.current
        },
        scrollSnapList: () =>
          Array.from({ length: stateRef.current.count }, (_, index) => index),
        selectedScrollSnap: () => stateRef.current.index,
        canScrollPrev: () =>
          options?.loop ? stateRef.current.count > 1 : stateRef.current.index > 0,
        canScrollNext: () =>
          options?.loop
            ? stateRef.current.count > 1
            : stateRef.current.index < stateRef.current.count - 1,
        scrollPrev: () => {
          if (!apiRef.current.canScrollPrev()) return
          stateRef.current.index = options?.loop
            ? (stateRef.current.index - 1 + stateRef.current.count) %
              stateRef.current.count
            : stateRef.current.index - 1
          forceRender((value) => value + 1)
          emit("select")
        },
        scrollNext: () => {
          if (!apiRef.current.canScrollNext()) return
          stateRef.current.index = options?.loop
            ? (stateRef.current.index + 1) % stateRef.current.count
            : stateRef.current.index + 1
          forceRender((value) => value + 1)
          emit("select")
        },
        scrollTo: (index: number) => {
          const lastIndex = Math.max(stateRef.current.count - 1, 0)
          stateRef.current.index = Math.max(0, Math.min(index, lastIndex))
          forceRender((value) => value + 1)
          emit("select")
        },
      }
    }

    const emblaRef = React.useCallback((node: HTMLDivElement | null) => {
      if (!node) return
      stateRef.current.count = node.querySelectorAll(".embla__slide").length
      emitReinit()
    }, [])

    const emitReinit = () => {
      listenersRef.current.reInit?.forEach((listener) => listener(apiRef.current))
      listenersRef.current.select?.forEach((listener) => listener(apiRef.current))
    }

    return [emblaRef, apiRef.current] as const
  }

  return { default: useEmblaCarousel }
})

import { BannerCarousel } from "./index"

describe("BannerCarousel", () => {
  it("renderiza dots e navega com setas", () => {
    const { container } = render(
      <BannerCarousel slides={[0, 1, 2]} options={{ loop: false }} />,
    )

    const dots = container.querySelectorAll(".embla__dot")
    const nextButton = container.querySelector(".embla__button--next")

    expect(dots).toHaveLength(3)
    expect(dots[0]?.classList.contains("embla__dot--selected")).toBe(true)

    fireEvent.click(nextButton as Element)

    expect(dots[1]?.classList.contains("embla__dot--selected")).toBe(true)
  })

  it("navega para um slide específico ao clicar no bullet", () => {
    const { container } = render(<BannerCarousel slides={[0, 1, 2]} />)

    const dots = container.querySelectorAll(".embla__dot")

    fireEvent.click(dots[2])

    expect(dots[2]?.classList.contains("embla__dot--selected")).toBe(true)
  })

  it("mantém o último slide quando o loop está desabilitado", () => {
    const { container } = render(
      <BannerCarousel slides={[0, 1, 2]} options={{ loop: false }} />,
    )

    const nextButton = container.querySelector(".embla__button--next")
    const dots = container.querySelectorAll(".embla__dot")

    fireEvent.click(nextButton as Element)
    fireEvent.click(nextButton as Element)
    fireEvent.click(nextButton as Element)

    expect(dots[2]?.classList.contains("embla__dot--selected")).toBe(true)
  })
})
