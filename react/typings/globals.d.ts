interface ToastAction {
  label: string
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  download?: string
}

interface ToastInterface {
  message: string
  action?: ToastAction
  dismissable?: boolean
  duration?: number
  horizontalPosition?: 'left' | 'right'
}

type Toast = ToastInterface | string
