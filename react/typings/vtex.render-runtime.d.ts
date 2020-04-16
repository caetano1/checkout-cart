import { ComponentType } from 'react'
import * as Runtime from 'vtex.render-runtime'

declare module 'vtex.render-runtime' {
  interface ExtensionPointProps {
    id: string
    [key: string]: any
  }

  export const ExtensionPoint: ComponentType<ExtensionPointProps>

  const useRuntime: () => Runtime.RenderContext
}
