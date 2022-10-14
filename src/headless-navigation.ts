import HeadlessUi from "./headless-ui"
import { keycodeEquals } from "./utils"
/**
 * Class for navigation
 * @class
 * @augments HeadlessUi
 * @link constructor
 * @link checkRequirements
 * @link addEventListeners
 * @link removeEventListeners
 * @link buttonKeyEvent
 * @link closeOnResize
 * */
class HeadlessNavigation extends HeadlessUi {
  protected declare readonly button: HTMLButtonElement | null
  protected declare readonly mainContainer: HTMLElement | null

  constructor() {
    super()
    this.button = this.querySelector("[aria-controls][aria-expanded]")
    this.mainContainer = this.querySelector(`#${this.button?.getAttribute("aria-controls")}`)
  }

  /**
   * Check if required element is present
   * @override
   * */
  protected checkRequirements() {
    if (!this.button) {
      throw new Error(`A button element with attribute "aria-controls" and "aria-expanded" is required`)
    }
    if (!this.mainContainer) {
      throw new Error(`A div element with ID equals button "aria-controls" is required`)
    }
  }

  /**
   * Bind event listeners to connectedCallback
   * @override
   * */
  protected addEventListeners() {
    super.addEventListeners()
    window.addEventListener("resize", this.closeOnResize.bind(this))
  }

  /**
   * Remove event listeners to connectedCallback
   * @override
   * */
  protected removeEventListeners() {
    super.removeEventListeners()
    window.removeEventListener("resize", this.closeOnResize)
  }

  /**
   * Keyboard event for button with attribute of aria-expanded and aria-haspopup
   * @override
   * */
  protected buttonKeyEvent(event: KeyboardEvent): void {
    if (keycodeEquals(["Space", "Enter"], event)) {
      event.preventDefault()
      this.toggleOpen()
    }
    keycodeEquals(["Escape"], event) && this.close()
  }

  /**
   * Window event for closing htmlElement with attribute of aria-labelledby by resizing window
   * */
  private closeOnResize() {
    this.close()
  }
}

customElements.define("headless-navigation", HeadlessNavigation);
