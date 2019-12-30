# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Improved React typings.
- Improved linter and fixed resulting errors.
- Styles builder updated to major 2.

## [0.24.2] - 2019-12-30
### Changed
- Security updates.

## [0.24.1] - 2019-12-23
### Changed
- Messages now reflect decisions made when implementing errors in shipping-calculator: `your cart` and `item` are now `the cart` and `product`.

## [0.24.0] - 2019-12-17
### Added
- `numberOfUnavailableItems` and `numberOfItems` to `shipping-calculator` in order to show a proper warnings.

## [0.23.0] - 2019-12-10
### Added
- `canEditData` prop to `shipping-calculator`.

## [0.22.2] - 2019-12-04
### Removed
- `sticky-layout` from the "Go to checkout" button.

## [0.22.1] - 2019-12-03
### Fixed
- `AddToCartUrl` not working on some devices.

## [0.22.0] - 2019-12-03
### Added
- `schema` to title and buttons so they appear in Site Editor.

## [0.21.1] - 2019-11-19
### Added
- Responsive container.

## [0.21.0] - 2019-11-14
### Removed
- `OrderFormProvider` and `OrderQueueProvider`, as they are now provided by `vtex.store`.

## [0.20.0] - 2019-11-14
### Removed
- `couponErrorKey` prop, since it is no longer necessary.

## [0.19.0] - 2019-11-08
### Added
- `checkout-coupon` info as props.

## [0.18.1] - 2019-11-07
### Changed
- Spacings.
- Place of a background rule.

## [0.18.0] - 2019-10-31
### Added
- Component that allows adding items to cart via query string.

## [0.17.0] - 2019-10-30
### Added
- Shipping data to `shipping-calculator` through props.

### Removed
- Loading spinner.

## [0.16.0] - 2019-10-29 [YANKED]
### Added
- Items can now be added via query string in the format `/cart/add?sku={skuId}&qty={quantity}&seller={seller}`

## [0.15.1] - 2019-10-23

## [0.15.0] - 2019-10-23

### Added
- Toast when the user removes an item from the cart.

## [0.14.0] - 2019-10-18

### Changed
- "Go to checkout" button is now a sticky footer on small screens.

## [0.13.2] - 2019-10-15
### Fixed
- "Continue Shopping" button text positioning on mobile.

## [0.13.1] - 2019-10-04
### Changed
- Layout's responsive margins.

## [0.13.0] - 2019-10-02
### Added
- `Divider` component to the page layout.

## [0.12.0] - 2019-10-02
### Changed
- `Cart` was broken into several smaller components in order to implement the `blocks` structure using `flex-layout`.

## [0.11.1] - 2019-10-01
### Added
- `id` to the element that shows items quantity on cart's title.

### Fixed
- Empty state button size and `href`.

## [0.11.0] - 2019-10-01
### Added
- Empty state.

## [0.10.0] - 2019-09-24
### Added
- Messages with general context from the Checkout API are now displayed in toasts.

## [0.9.0] - 2019-09-23
## Changed
- `Shipping-calculator` is now wrapped by `OrderShippingProvider`.

## [0.8.2] - 2019-09-13
### Changed
- Adapted product list to the changes in the `order-items` API.

## [0.8.1] - 2019-09-10
### Fixed
- Title alignment on large screens.

### Changed
- Title does not display number of items in the cart if one of them is unavailable.

## [0.8.0] - 2019-09-05
### Changed
- Product list change events are handled with the item's `uniqueId` instead of its `index`.

## [0.7.0] - 2019-08-29
### Changed
- Item list is not kept in the component's state anymore.

## [0.6.0] - 2019-08-26
### Added
- "Cart" title to component.

## [0.5.0] - 2019-08-23

## [0.4.0] - 2019-08-22
### Added
- `shipping-calculator` extension point to `Cart`.

## [0.3.1] - 2019-08-21
### Changed
- `Cart` component is now wrapped by a `OrderManagerProvider` temporarily.

## [0.2.0] - 2019-08-19
### Added
- `checkout-summary` component to `Cart`.

### Changed
- Improved cart layout and responsiveness.

## [0.1.0] - 2019-08-13
### Added
- `ProductList` component to `Cart`.
