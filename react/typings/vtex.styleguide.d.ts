declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const Button: ComponentType<any>
  export const Divider: ComponentType<any>
  export const EmptyState: ComponentType<any>
  export const Input: ComponentType<InputProps>
  export const ToastContext: ReactContext

  interface InputProps {
    [key: string]: any
  }
}
