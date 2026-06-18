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
    checkboxId,
    checked,
    currentItem,
    goNext,
    goPrevious,
    hasNext,
    hasPrevious,
    isOpen,
    normalizedItems,
    setChecked,
  } = useDialogController(props)

  if (!isOpen || !currentItem) {
    return null
  }

  return createPortal(
    <div className={styles.backdrop} onClick={goNext}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={currentItem.title ?? `Modal ${activeIndex + 1}`}
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <DialogCloseButton
          className={styles.closeButton}
          iconClassName={styles.closeIcon}
          onClick={goNext}
        />

        <DialogMedia
          item={currentItem}
          frameClassName={styles.mediaFrame}
          mediaClassName={styles.media}
        />

        <DialogFooter
          checkboxId={checkboxId}
          checked={checked}
          currentStep={activeIndex + 1}
          onCheckedChange={setChecked}
          onNext={goNext}
          onPrevious={goPrevious}
          showNavigation={normalizedItems.length > 1}
          totalSteps={normalizedItems.length}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          checkboxContainerClassName={styles.checkboxContainer}
          checkboxRowClassName={styles.checkboxRow}
          actionsClassName={styles.actions}
          counterClassName={styles.counter}
          buttonGroupClassName={styles.buttonGroup}
          primaryButtonClassName={styles.primaryButton}
          secondaryButtonClassName={styles.secondaryButton}
        />
      </div>
    </div>,
    document.body,
  )
}
