import { Item } from 'vtex.checkout-graphql'

type CartItem = Item & { imageUrl?: string }

interface PixelCartItem {
  skuId: string
  variant: string
  price: number
  name: string
  quantity: number
  productId: string
  productRefId: string
  brand: string
  category: string
  detailUrl: string
  imageUrl: string
  referenceId: string
  seller: string
}

/**
 * URL comes like "//storecomponents.vteximg.com.br/arquivos/ids/155491"
 * this function guarantees it comes with protocol in it.
 */
function fixUrlProtocol(url: string) {
  if (!url || url.indexOf('http') === 0) {
    return url
  }

  return `https:${url}`
}

/**
 * Remove the variant from the end of the name.
 * Ex: from "Classic Shoes Pink" to "Classic Shoes"
 */
function getNameWithoutVariant(item: CartItem) {
  if (!item.name?.includes(item.skuName ?? '')) {
    return item.name ?? ''
  }

  const leadingSpace = 1
  const variantLength = leadingSpace + (item.skuName?.length ?? 0)

  return item.name.slice(0, item.name.length - variantLength) ?? ''
}

function productCategory(item: CartItem) {
  try {
    const categoryIds =
      item.productCategoryIds?.split('/').filter(c => c.length) ?? []
    const category = categoryIds.map(id => item.productCategories[id]).join('/')

    return category
  } catch {
    return ''
  }
}

export function mapCartItemToPixel(item: CartItem): PixelCartItem {
  return {
    skuId: item.id,
    variant: item.skuName ?? '',
    price: item.sellingPrice ?? 0,
    name: getNameWithoutVariant(item),
    quantity: item.quantity,
    productId: item.productId,
    productRefId: item.productRefId ?? '',
    brand: item.additionalInfo?.brandName ?? '',
    category: productCategory(item),
    detailUrl: item.detailUrl ?? '',
    imageUrl: item.imageUrls
      ? fixUrlProtocol(item.imageUrls.at3x)
      : item.imageUrl ?? '',
    referenceId: item.refId ?? '',
    seller: item.seller,
  }
}
