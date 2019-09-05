# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
