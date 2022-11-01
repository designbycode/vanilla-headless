import HeadlessUi from "./headless-ui"
import { keycodeEquals } from "./utils"
import HeadlessButton from "./headless-button"
/**
 * Class for navigation
 * @class HeadlessNavigation
 * @augments HeadlessUi
 * @link constructor
 * @link observedAttributes
 * @link states
 * @link attributeChangedCallback
 * @link checkRequirements
 * @link addEventListeners
 * @link removeEventListeners
 * @link buttonKeyEvent
 * @link open
 * @link close
 * @link updateAttributeState
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
    this.dataset.state = this.ariaExpanded === "true" ? "open" : "close"
    this.updateAttributeState(String(this.dataset.state))
  }

  /**
   * Observe attributes that change
   */
  static get observedAttributes() {
    return ["data-state"]
  }

  /**
   * Return node list of data-state
   * @private
   * @return NodeListOf<HtmlElements>
   */
  private get states(): NodeListOf<HTMLElement> {
    return this.querySelectorAll("[data-state]")
  }

  /**
   * Callback then attribute changed
   * @param property
   * @param oldValue
   * @param newValue
   */
  attributeChangedCallback(property: any, oldValue: any, newValue: any) {
    if (property === "data-state" && oldValue !== newValue) {
      this.updateAttributeState(newValue)
      if (newValue === "open") {
        this.open()
      } else if (newValue === "close") {
        this.close()
      }
    }
  }

  /**
   * Check if required element is present
   * @override HeadlessUi
   * @return void
   * */
  protected checkRequirements(): void {
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
   * @override HeadlessUi
   * @return void
   * */
  protected addEventListeners(): void {
    super.addEventListeners()
    window.addEventListener("resize", this.closeOnResize.bind(this))
  }

  /**
   * Remove event listeners to connectedCallback
   * @override HeadlessUi
   * @return void
   * */
  protected removeEventListeners(): void {
    super.removeEventListeners()
    window.removeEventListener("resize", this.closeOnResize)
  }

  /**
   * Keyboard event for button with attribute of aria-expanded and aria-haspopup
   * @override HeadlessUi
   * @return void
   * */
  protected buttonKeyEvent(event: KeyboardEvent): void {
    if (keycodeEquals(["Space", "Enter"], event)) {
      event.preventDefault()
      this.toggleOpen()
    }
    keycodeEquals(["Escape"], event) && this.close()
  }

  /**
   * Open htmlElement with attribute of aria-labelledby
   * @return void
   * */
  protected open(): void {
    super.open()
    this.dataset.state = "open"
  }

  /**
   * Window event for closing htmlElement with attribute of aria-labelledby by resizing window
   * @override HeadlessUi
   * */
  protected close(): void {
    super.close()
    this.dataset.state = "close"
  }

  /**
   * Update all data-state attributes to parent dataset
   * @param value
   * @private
   */
  private updateAttributeState(value: string): void {
    this.states.forEach((state) => (state.dataset.state = value))
  }

  /**
   * Close mobile navigation on window resize event
   * @private
   */
  private closeOnResize(): void {
    this.close()
  }
}

customElements.define("headless-navigation", HeadlessNavigation)
