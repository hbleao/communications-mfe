import React, { useEffect, useMemo, useRef, useState } from "react"
import * as stylesImport from "./styles.module.scss"

const styles = ((stylesImport as any).default ?? stylesImport) as Record<
  string,
  string
>

export type BannerSlide = {
  id: string
  title: string
  description?: string
  ctaLabel?: string
  onCtaClick?: () => void
  href?: string
  background?: {
    from: string
    to: string
  }
}

export type BannerRotativoProps = {
  slides: BannerSlide[]
  autoplay?: boolean
  intervalMs?: number
  initialIndex?: number
  onSlideChange?: (index: number) => void
}

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0
  const mod = index % length
  return mod < 0 ? mod + length : mod
}

export function BannerRotativo({
  slides,
  autoplay = true,
  intervalMs = 4500,
  initialIndex = 0,
  onSlideChange,
}: BannerRotativoProps) {
  const baseSlideWidth = 1157
  const baseSlideHeight = 443
  const maxPeek = 140
  const gapPx = 18

  const length = slides.length
  const [index, setIndex] = useState(() => clampIndex(initialIndex, length) + 1)
  const [paused, setPaused] = useState(false)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  }, [])

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const autoplayTimerRef = useRef<number | null>(null)
  const progressRafRef = useRef<number | null>(null)
  const progressStartRef = useRef<number | null>(null)
  const progressAccumulatedRef = useRef(0)
  const [activeProgressPct, setActiveProgressPct] = useState(0)
  const [layout, setLayout] = useState(() => ({
    slideWidth: baseSlideWidth,
    slideHeight: baseSlideHeight,
    peek: maxPeek,
  }))

  useEffect(() => {
    setIndex((current) => clampIndex(current - 1, length) + 1)
  }, [length])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    if (typeof ResizeObserver === "undefined") return

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const viewportWidth = Math.floor(entry.contentRect.width)

      const peek = Math.min(maxPeek, Math.max(0, Math.floor((viewportWidth - 1) / 6)))
      const slideWidth = Math.max(1, viewportWidth - peek * 2)
      const slideHeight = Math.max(
        1,
        Math.round((slideWidth * baseSlideHeight) / baseSlideWidth),
      )

      setLayout((current) => {
        if (
          current.slideWidth === slideWidth &&
          current.slideHeight === slideHeight &&
          current.peek === peek
        ) {
          return current
        }

        return { slideWidth, slideHeight, peek }
      })
    })

    ro.observe(viewport)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (autoplayTimerRef.current !== null) {
      window.clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }

    if (!autoplay) return
    if (paused) return
    if (length <= 1) return
    if (reducedMotion) return

    const id = window.setInterval(() => {
      setTransitionEnabled(true)
      setIndex((current) => current + 1)
    }, intervalMs)

    autoplayTimerRef.current = id
    return () => {
      window.clearInterval(id)
      if (autoplayTimerRef.current === id) autoplayTimerRef.current = null
    }
  }, [autoplay, paused, length, intervalMs, reducedMotion])

  useEffect(() => {
    if (transitionEnabled) return
    const id = window.requestAnimationFrame(() => setTransitionEnabled(true))
    return () => window.cancelAnimationFrame(id)
  }, [transitionEnabled])

  const autoplayRunning = autoplay && !paused && length > 1 && !reducedMotion

  useEffect(() => {
    if (length <= 0) return

    progressAccumulatedRef.current = 0
    progressStartRef.current = autoplayRunning ? performance.now() : null
    setActiveProgressPct(0)
  }, [index, length, intervalMs])

  useEffect(() => {
    const cancelProgressLoop = () => {
      if (progressRafRef.current === null) return
      window.cancelAnimationFrame(progressRafRef.current)
      progressRafRef.current = null
    }

    if (!autoplayRunning) {
      if (progressStartRef.current !== null) {
        progressAccumulatedRef.current += performance.now() - progressStartRef.current
        progressStartRef.current = null
      }

      cancelProgressLoop()
      return
    }

    if (typeof window.requestAnimationFrame !== "function") return

    if (progressStartRef.current === null) {
      progressStartRef.current = performance.now()
    }

    const tick = () => {
      const start = progressStartRef.current
      const elapsed =
        progressAccumulatedRef.current +
        (start !== null ? performance.now() - start : 0)

      const pct = Math.max(0, Math.min(100, (elapsed / intervalMs) * 100))
      setActiveProgressPct(pct)

      progressRafRef.current = window.requestAnimationFrame(tick)
    }

    progressRafRef.current = window.requestAnimationFrame(tick)

    return cancelProgressLoop
  }, [autoplayRunning, intervalMs])

  useEffect(() => {
    if (length <= 0) return
    onSlideChange?.(clampIndex(index - 1, length))
  }, [index, onSlideChange])

  const goTo = (next: number) => {
    setTransitionEnabled(true)
    setIndex(next)
  }
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  const translateX = `translateX(${-index * (layout.slideWidth + gapPx)}px)`

  const slidesWithClones = useMemo(() => {
    if (length <= 0) return []
    return [slides[length - 1], ...slides, slides[0]]
  }, [slides, length])

  const activeDotIndex = length <= 0 ? 0 : clampIndex(index - 1, length)

  return (
    <section
      role="region"
      aria-label="Banner rotativo"
      className={styles.root}
      onMouseEnter={() => {
        if (autoplayTimerRef.current !== null) {
          window.clearInterval(autoplayTimerRef.current)
          autoplayTimerRef.current = null
        }
        setPaused(true)
      }}
      onMouseLeave={() => setPaused(false)}
      onPointerEnter={() => {
        if (autoplayTimerRef.current !== null) {
          window.clearInterval(autoplayTimerRef.current)
          autoplayTimerRef.current = null
        }
        setPaused(true)
      }}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => {
        if (autoplayTimerRef.current !== null) {
          window.clearInterval(autoplayTimerRef.current)
          autoplayTimerRef.current = null
        }
        setPaused(true)
      }}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carrossel"
      style={{
        ["--br-slide-width" as any]: `${layout.slideWidth}px`,
        ["--br-slide-height" as any]: `${layout.slideHeight}px`,
        ["--br-peek" as any]: `${layout.peek}px`,
        ["--br-gap" as any]: `${gapPx}px`,
      }}
    >
      <div ref={viewportRef} className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: translateX,
            transitionDuration:
              !transitionEnabled || reducedMotion ? "0ms" : "520ms",
          }}
          onTransitionEnd={() => {
            if (length <= 0) return
            if (index === 0) {
              setTransitionEnabled(false)
              setIndex(length)
              return
            }
            if (index === length + 1) {
              setTransitionEnabled(false)
              setIndex(1)
            }
          }}
        >
          {slidesWithClones.map((slide, i) => {
            const from = slide.background?.from ?? "#0ea5e9"
            const to = slide.background?.to ?? "#6366f1"
            const background = `radial-gradient(1200px circle at 20% 0%, rgba(255,255,255,0.25), rgba(255,255,255,0) 42%), linear-gradient(135deg, ${from}, ${to})`

            const content = (
              <div className={styles.slideInner} style={{ background }}>
                <div className={styles.glass}>
                  <div className={styles.title}>{slide.title}</div>
                  {slide.description ? (
                    <div className={styles.description}>{slide.description}</div>
                  ) : null}
                  {slide.ctaLabel ? (
                    <button
                      type="button"
                      className={styles.cta}
                      onClick={(e) => {
                        e.preventDefault()
                        slide.onCtaClick?.()
                      }}
                    >
                      {slide.ctaLabel}
                    </button>
                  ) : null}
                </div>
              </div>
            )

            return (
              <div key={`${slide.id}-${i}`} className={styles.slide}>
                {slide.href ? (
                  <a className={styles.slideLink} href={slide.href}>
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            )
          })}
        </div>
      </div>

      {length > 1 ? (
        <div className={styles.controls} aria-label="Controles do carrossel">
          <button
            type="button"
            className={`${styles.controlsArrow} ${styles.controlsArrowLeft}`}
            onClick={prev}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className={styles.dots} role="tablist" aria-label="Slides">
            {slides.map((slide, i) => {
              const active = i === activeDotIndex
              return (
                <button
                  key={slide.id}
                  type="button"
                  className={`${styles.dot} ${active ? styles.dotActive : ""}`}
                  onClick={() => goTo(i + 1)}
                  aria-label={`Ir para o slide ${i + 1}`}
                  aria-selected={active}
                  role="tab"
                  style={{
                    ["--br-dot-progress" as any]: active
                      ? `${activeProgressPct.toFixed(2)}%`
                      : "0%",
                  }}
                />
              )
            })}
          </div>

          <button
            type="button"
            className={`${styles.controlsArrow} ${styles.controlsArrowRight}`}
            onClick={next}
            aria-label="Próximo"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  )
}
