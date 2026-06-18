import { createPortal } from "react-dom"
import { DialogCloseButton } from "./DialogCloseButton"
import { DialogFooter } from "./DialogFooter"
import { DialogMedia } from "./DialogMedia"
import * as stylesImport from "./styles.module.scss"
import { DialogProps } from "./types"
import { useDialogController } from "./useDialogController"

const styles = ((stylesImport as any).default ?? stylesImport) as Record<string, string>

export type { DialogItem, DialogProps } from "./types"

export function Dialog(props: DialogProps) {
  const {
    activeIndex,
    activeItem,
    checkboxId,
    checked,
    goNext,
    isOpen,
    normalizedItems,
    setChecked,
  } = useDialogController(props)

  if (!isOpen || !activeItem) {
    return null
  }

  return createPortal(
    <div className={styles.backdrop} onClick={goNext}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={activeItem.title ?? `Modal ${activeIndex + 1}`}
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <DialogCloseButton
          className={styles.closeButton}
          iconClassName={styles.closeIcon}
          onClick={goNext}
        />

        <DialogMedia
          mediaItem={activeItem}
          frameClassName={styles.mediaFrame}
          mediaClassName={styles.media}
        />

        <DialogFooter
          checkboxId={checkboxId}
          checked={checked}
          currentStep={activeIndex + 1}
          onCheckedChange={setChecked}
          showNavigation={normalizedItems.length > 1}
          totalSteps={normalizedItems.length}
          checkboxContainerClassName={styles.checkboxContainer}
          checkboxRowClassName={styles.checkboxRow}
          actionsClassName={styles.actions}
          counterClassName={styles.counter}
        />
      </div>
    </div>,
    document.body,
  )
}
