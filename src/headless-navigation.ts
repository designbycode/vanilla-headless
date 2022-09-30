import HeadlessUi from "./headless-ui"
import { keycodeEquals } from "./utils"

class HeadlessNavigation extends HeadlessUi {
  protected declare readonly button: HTMLButtonElement | null
  protected declare readonly mainContainer: HTMLElement | null

  constructor() {
    super()
    this.button = this.querySelector("[aria-controls][aria-expanded]")
    this.mainContainer = this.querySelector(`#${this.button?.getAttribute("aria-controls")}`)
    if (!this.button) {
      throw new Error(`A button element with attribute "aria-controls" and "aria-expanded" or is="button" is required`)
    }
    if (!this.mainContainer) {
      throw new Error(`A div element with id equals button "aria-controls" or is="panel" is required`)
    }
  }

  protected buttonKeyEvent(event: KeyboardEvent) {
    if (keycodeEquals(["Space", "Enter"], event)) {
      event.preventDefault()
      this.toggleOpen()
    }

    keycodeEquals(["Escape"], event) && this.close()
  }
}

customElements.define("headless-navigation", HeadlessNavigation)
