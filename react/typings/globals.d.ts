interface Item {
  additionalInfo: ItemAdditionalInfo
  availability: string
  detailUrl: string
  id: string
  imageUrl: string
  listPrice: number
  measurementUnit: string
  messages: OrderFormMessages
  name: string
  price: number
  productId: string
  quantity: number
  sellingPrice: number
  skuName: string
  skuSpecifications: SKUSpecification[]
  uniqueId: string
}

interface ItemAdditionalInfo {
  brandName: string
}

interface OrderFormMessages {
  couponMessages: Message[]
  generalMessages: Message[]
}

interface Message {
  code: string
  text: string
  status: string
}

interface SKUSpecification {
  fieldName: string
  fieldValues: string[]
}

interface Totalizer {
  id: string
  name: string
  value: number
}

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
