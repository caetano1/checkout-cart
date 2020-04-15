import * as Runtime from 'vtex.render-runtime'

declare global {
  interface Window {
    __RUNTIME__?: Runtime.RenderContext
  }
}
