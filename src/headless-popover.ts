import HeadlessUi from "./headless-ui"
/**
 * Class for popovers menus
 * @class
 * @augments HeadlessUi
 * @link constructor
 * */
export class HeadlessPopover extends HeadlessUi {
  constructor() {
    super()
  }
}

customElements.define("headless-popover", HeadlessPopover)
