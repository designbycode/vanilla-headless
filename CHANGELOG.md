# Release Notes

## [Unreleased](https://github.com/designbycode/vanilla-headless/compare/v0.7.2...HEAD)
- Unreleased

## [v0.7.2](https://github.com/designbycode/vanilla-headless/compare/v0.7.1...v0.7.2) - 2022-11-11
### Change 
- Changed from laravel-mix to rollupjs
- Dropdown: fixed tabindex

## Added 
- Support for commenjs esm umd

## [v0.7.0](https://github.com/designbycode/vanilla-headless/compare/v0.6.4...v0.7.0) - 2022-11-09
### Added 
- ScrollTop: added attribute skip-to-focus to add focus to skip to main

## [v0.6.4](https://github.com/designbycode/vanilla-headless/compare/v0.6.2...v0.6.4) - 2022-11-07
### Change
- Darkmode: fixed Tab and Shift + Tab to focus out.
- Darkmode: removeEventListeners disconnectedCallback
- Darkmode: Update return types
- Darkmode: Add multiply data-theme for styling to any element in component. 
- Darkmode: Programmatically set button aria-checked if not exist.
- Toggle: Programmatically set button aria-checked if not exist.

## [v0.6.2](https://github.com/designbycode/vanilla-headless/compare/v0.6.1...v0.6.2) - 2022-11-01
### Added
- Navigation work now with two-way binding changing data-state attribute

### Change 
- Renamed popper attribute offsets to offset
- Refactored toggle switch


## [v0.6.1](https://github.com/designbycode/vanilla-headless/compare/v0.5.8...v0.6.1) - 2022-10-29
### Added
- Custom toggle switch component 
- Navigation update by adding an ``data-state="open | close"`` to help with css styling. 

## [v0.5.8](https://github.com/designbycode/vanilla-headless/compare/v0.5.5...v0.5.8) - 2022-10-28
### Change 
- Reverted back to display block

## [v0.5.5](https://github.com/designbycode/vanilla-headless/compare/v0.5.4...v0.5.5) - 2022-10-28
### Change 
- Fixed save initial display navigation element

## [v0.5.4](https://github.com/designbycode/vanilla-headless/compare/v0.5.2...v0.5.4) - 2022-10-28
### Change 
- Fixed save initial display state off dropdown element 
- Removed console log

## [v0.5.2](https://github.com/designbycode/vanilla-headless/compare/v0.5.1...v0.5.2) - 2022-10-26
### Change 
- Fixed popper default values

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
