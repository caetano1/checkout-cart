import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ToastContext } from 'vtex.styleguide'

interface Context {
  enqueueToasts: (toasts: Toast[]) => void
}

const CartToastContext = createContext<Context | undefined>(undefined)

export const CartToastProvider: FunctionComponent = ({ children }) => {
  const { showToast, toastState } = useContext(ToastContext)
  const [toastQueue, setToastQueue] = useState([] as Toast[])

  useEffect(() => {
    if (!toastState.isToastVisible && toastQueue.length > 0) {
      showToast(toastQueue[0])
      setToastQueue(queue => queue.slice(1))
    }
  }, [showToast, toastState.isToastVisible, toastQueue])

  const enqueueToasts = useCallback(
    (toasts: Toast[]) => {
      setToastQueue(queue => [...queue, ...toasts])
    },
    [setToastQueue]
  )

  const value = useMemo(() => ({ enqueueToasts }), [enqueueToasts])

  return (
    <CartToastContext.Provider value={value}>
      {children}
    </CartToastContext.Provider>
  )
}

export const useCartToastContext = () => {
  const context = useContext(CartToastContext)
  if (context === undefined) {
    throw new Error(
      'useCartToastContext must be used within a CartToastProvider'
    )
  }

  return context
}

export default { useCartToastContext }
