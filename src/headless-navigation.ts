import HeadlessUi from "./headless-ui"
import { keycodeEquals } from "./utils"
import HeadlessButton from "./headless-button"
import { randomId } from "./utils"
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
  protected declare readonly buttons: NodeListOf<HTMLButtonElement | HeadlessButton | null>
  protected declare readonly mainContainer: HTMLElement | null

  constructor() {
    super()
    this.buttons = this.querySelectorAll("[aria-expanded][aria-controls]")
    this.mainContainer = this.querySelector(`#${this.buttons[0]?.getAttribute("aria-controls")}`)
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
        this.buttons.forEach((button) => (button.ariaExpanded = "true"))
      } else if (newValue === "close") {
        this.close()
        this.buttons.forEach((button) => (button.ariaExpanded = "false"))
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
      throw new Error(`A button element with attribute "aria-controls" and "aria-expanded" is required`)
    }
    if (!this.mainContainer) {
      throw new Error(`A div element with ID equals button "aria-controls" is required`)
    }
  }

  /**
   * Bind event listeners to connectedCallback
   * @override HeadlessUi
   * @return void
   * */
  protected addEventListeners(): void {
    this.buttons.forEach((button) => button.addEventListener("click", this.toggleOpen.bind(this)))
    this.buttons.forEach((button) => button.addEventListener("keydown", this.buttonKeyEvent.bind(this)))
    window.addEventListener("keydown", this.closeOnExitKeyDown.bind(this))
    window.addEventListener("click", this.closeOnClickOutSide.bind(this))
    window.addEventListener("resize", this.closeOnResize.bind(this))
  }

  /**
   * Remove event listeners to connectedCallback
   * @override HeadlessUi
   * @return void
   * */
  protected removeEventListeners(): void {
    this.buttons.forEach((button) => button.removeEventListener("click", this.toggleOpen))
    this.buttons.forEach((button) => button.removeEventListener("keydown", this.buttonKeyEvent))
    window.removeEventListener("keydown", this.closeOnExitKeyDown)
    window.removeEventListener("click", this.closeOnClickOutSide)
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
