import HeadlessUi from "./headless-ui"
import { keycodeEquals } from "./utils"
import HeadlessButton from "./headless-button"
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
 * @since 0.1.4
 * */
class HeadlessNavigation extends HeadlessUi {
  protected declare readonly button: HTMLButtonElement | HeadlessButton | null
  protected declare readonly mainContainer: HTMLElement | null

  constructor() {
    super()
    this.button = this.querySelector("[aria-controls][aria-expanded]")
    this.mainContainer = this.querySelector(`#${this.button?.getAttribute("aria-controls")}`)
    this.initialDisplayStyle = "block"
  }

  /**
   * Check if required element is present
   * @override
   * */
  protected checkRequirements() {
    if (!this.button) {
      console.log(
        `c% A button element with attribute "aria-controls" and "aria-expanded" is required`,
        `color:red;background-color:pink;font-size:18px; padding: 3px; border-radius: 3px; border: red 1px solid;`
      )
    }
    if (!this.mainContainer) {
      console.log(
        `c% A div element with ID equals button "aria-controls" is required`,
        `color:red;background-color:pink;font-size:18px; padding: 3px; border-radius: 3px; border: red 1px solid;`
      )
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

customElements.define("headless-navigation", HeadlessNavigation)
