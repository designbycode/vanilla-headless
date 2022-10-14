import HeadlessUi from "./headless-ui"

/**
 * Class for popovers menus
 * @class
 * @augments HeadlessUi
 * @link constructor
 * @since 0.1.4
 * */
export class HeadlessPopover extends HeadlessUi {
  constructor() {
    super()
  }
}

customElements.define("headless-popover", HeadlessPopover)
