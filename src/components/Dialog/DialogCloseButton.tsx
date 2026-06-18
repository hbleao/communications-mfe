type DialogCloseButtonProps = {
  className: string
  iconClassName: string
  onClick: () => void
}

export function DialogCloseButton({
  className,
  iconClassName,
  onClick,
}: DialogCloseButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label="Fechar"
    >
      <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
