type DialogFooterProps = {
  checkboxId: string
  checked: boolean
  currentStep: number
  onCheckedChange: (checked: boolean) => void
  showNavigation: boolean
  totalSteps: number
  checkboxContainerClassName: string
  checkboxRowClassName: string
  actionsClassName: string
  counterClassName: string
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
        </div>
      ) : null}
    </div>
  )
}
