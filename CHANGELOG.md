# Release Notes

## [Unreleased](https://github.com/designbycode/vanilla-headless/compare/v0.5.1...HEAD)
- Unreleased

## [v0.5.1](https://github.com/designbycode/vanilla-headless/compare/v0.5.0...v0.5.1) - 2022-10-24
### Change 
- Add inline style to hide and display section


## [v0.5.0](https://github.com/designbycode/vanilla-headless/compare/v0.4.0...v0.5.0) - 2022-10-23
### Added
- Headless button added disabled prevent event listeners from firing.
### Changes
- ScrollTop: implement HeadlessButton
- Change error styling for missing attribute in console.
- All components can use ``is="headless-button"``

## [v0.5.0](https://github.com/designbycode/vanilla-headless/compare/v0.3.1...v0.4.0) - 2022-10-15

### Added
- Added abstract HeadlessButton class to handle aria-pressed attribute
- GoBack: added ``headless-goback`` directive that implements HeadlessButton
### Changes
- ScrollTop: implement HeadlessButton

## [v0.3.1](https://github.com/designbycode/vanilla-headless/compare/v0.2.2...v0.3.1) - 2022-10-14
### Added
- Rating: added rating component 
- Darkmode: added dark mode web component

### Changes
- Disclosure: switch to attributes to use aria-mixin api

## [v0.2.2](https://github.com/designbycode/vanilla-headless/compare/v0.2.1...v0.2.2) - 2022-10-10
### Fixed
- ScrollToTop: mouseup, mousedown, keydown, keyup event listeners updated

## [v0.2.1](https://github.com/designbycode/vanilla-headless/compare/v0.2.0...v0.2.1) - 2022-10-10
### Fixed
- ScrollToTop: Fixed keydown event for Space or Enter while focus is on button.
### Added
- ScrollToTop: Added keypress attribute mouse and keyboard events.

## [v0.2.0](https://github.com/designbycode/vanilla-headless/compare/v0.1.5...v0.2.0) - 2022-10-9
### Added
- Navigation: Added mobile button toggle functionality for menu.
- ScrollToTop: Make any button trigger a scroll to top of window event. 
