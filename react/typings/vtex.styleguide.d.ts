declare module 'vtex.styleguide' {
  import { ComponentType, Context } from 'react'

  export const Input: ComponentType<InputProps>
  export const ToastContext: Context
  export const Button: ComponentType<any>
  export const Divider: ComponentType<any>
  export const EmptyState: ComponentType<any>

  interface InputProps {
    [key: string]: any
  }
}
