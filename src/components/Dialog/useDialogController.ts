import { useEffect, useMemo, useState } from "react"

import { defaultDialogItems } from "./constants"
import { DialogItem } from "./types"

type UseDialogControllerArgs = {
  items?: DialogItem[]
  initialIndex?: number
}

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0
  return Math.min(Math.max(index, 0), length - 1)
}

export function useDialogController({
  items,
  initialIndex = 0,
}: UseDialogControllerArgs) {
  const checkboxBaseId = useMemo(
    () => `dialog-checkbox-${Math.random().toString(36).slice(2, 10)}`,
    [],
  )
  const normalizedItems =
    items && items.length > 0 ? items : defaultDialogItems

  const [checked, setChecked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() =>
    clampIndex(initialIndex, normalizedItems.length),
  )

  useEffect(() => {
    setIsOpen(true)
    setActiveIndex(clampIndex(initialIndex, normalizedItems.length))
  }, [initialIndex, normalizedItems.length])

  useEffect(() => {
    setChecked(false)
  }, [activeIndex])

  const activeItem = normalizedItems[activeIndex]
  const hasNext = activeIndex < normalizedItems.length - 1

  const goNext = () => {
    if (hasNext) {
      setActiveIndex((index) => index + 1)
      return
    }

    setIsOpen(false)
  }

  return {
    activeIndex,
    checkboxId: `${checkboxBaseId}-${activeIndex}`,
    activeItem,
    checked,
    goNext,
    hasNext,
    isOpen,
    normalizedItems,
    setChecked,
  }
}
