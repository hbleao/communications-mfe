import React, { useEffect, useMemo, useRef } from "react"
import { createPortal } from "react-dom"
import * as stylesImport from "./styles.module.scss"

const styles = ((stylesImport as any).default ?? stylesImport) as Record<
  string,
  string
>

export type ModalSize = "sm" | "md" | "lg"

export type ModalProps = {
  open: boolean
  title?: string
  children: React.ReactNode
  onClose: () => void
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  size?: ModalSize
  footer?: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
}

function getFocusableElements(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ]

  return Array.from(
    container.querySelectorAll<HTMLElement>(selectors.join(",")),
  ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"))
}

function useStableId(prefix: string) {
  return useMemo(
    () => `${prefix}-${Math.random().toString(36).slice(2, 10)}`,
    [prefix],
  )
}

export function Modal({
  open,
  title,
  children,
  onClose,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = "md",
  footer,
  primaryAction,
  secondaryAction,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)
  const titleId = useStableId("modal-title")
  const labelId = title ? titleId : undefined

  useEffect(() => {
    if (!open) return

    lastActiveElementRef.current = document.activeElement as HTMLElement | null

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusDialog = () => {
      const dialog = dialogRef.current
      if (!dialog) return

      const focusables = getFocusableElements(dialog)
      if (focusables.length > 0) focusables[0].focus()
      else dialog.focus()
    }

    const timeoutId = window.setTimeout(focusDialog, 0)

    return () => {
      window.clearTimeout(timeoutId)
      document.body.style.overflow = originalOverflow

      const lastActive = lastActiveElementRef.current
      if (lastActive) lastActive.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current) return

      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab") return

      const focusables = getFocusableElements(dialogRef.current)
      if (focusables.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey) {
        if (!active || active === first || !dialogRef.current.contains(active)) {
          event.preventDefault()
          last.focus()
        }
      } else {
        if (!active || active === last || !dialogRef.current.contains(active)) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, closeOnEscape, onClose])

  if (!open) return null

  const maxWidth = size === "sm" ? 420 : size === "lg" ? 880 : 640

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (!closeOnBackdropClick) return
        if (e.target === e.currentTarget) onClose()
      }}
      aria-hidden={false}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        ref={dialogRef}
        tabIndex={-1}
        className={styles.dialog}
        style={{ ["--modal-max-width" as any]: `${maxWidth}px` }}
      >
        <div className={styles.header}>
          {title ? (
            <div id={titleId} className={styles.title}>
              {title}
            </div>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className={styles.iconButton}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>{children}</div>

        {footer || primaryAction || secondaryAction ? (
          <div className={styles.footer}>
            {footer ? (
              footer
            ) : (
              <div className={styles.actions}>
                {secondaryAction ? (
                  <button
                    type="button"
                    onClick={secondaryAction.onClick}
                    disabled={secondaryAction.disabled}
                    className={styles.secondaryButton}
                  >
                    {secondaryAction.label}
                  </button>
                ) : null}
                {primaryAction ? (
                  <button
                    type="button"
                    onClick={primaryAction.onClick}
                    disabled={primaryAction.disabled}
                    className={styles.primaryButton}
                  >
                    {primaryAction.label}
                  </button>
                ) : null}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
