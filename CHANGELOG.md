# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.12.0] - 2019-10-02

### Changed

- `Cart` was broken into several smaller components in order to implement the `blocks` structure using `flex-layout`.

## [0.11.1] - 2019-10-01

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
