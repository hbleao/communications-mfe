type DialogFooterProps = {
  checkboxId: string
  checked: boolean
  currentStep: number
  onCheckedChange: (checked: boolean) => void
  onNext: () => void
  onPrevious: () => void
  showNavigation: boolean
  totalSteps: number
  hasNext: boolean
  hasPrevious: boolean
  checkboxContainerClassName: string
  checkboxRowClassName: string
  actionsClassName: string
  counterClassName: string
  buttonGroupClassName: string
  primaryButtonClassName: string
  secondaryButtonClassName: string
}

export function DialogFooter(props: DialogFooterProps) {
  return (
    <div className={props.checkboxContainerClassName}>
      <label htmlFor={props.checkboxId} className={props.checkboxRowClassName}>
        <input
          id={props.checkboxId}
          type="checkbox"
          checked={props.checked}
          onChange={(event) => props.onCheckedChange(event.target.checked)}
        />
        <span>Não mostrar novamente</span>
      </label>

      {props.showNavigation ? (
        <div className={props.actionsClassName}>
          <span className={props.counterClassName}>
            {props.currentStep} de {props.totalSteps}
          </span>

          <div className={props.buttonGroupClassName}>
            <button
              type="button"
              className={props.secondaryButtonClassName}
              onClick={props.onPrevious}
              disabled={!props.hasPrevious}
            >
              Anterior
            </button>

            <button
              type="button"
              className={props.primaryButtonClassName}
              onClick={props.onNext}
            >
              {props.hasNext ? "Próximo" : "Concluir"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
