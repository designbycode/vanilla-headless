import { keycodeEquals } from "./utils"
/**
 * @class HeadlessToggle
 * @extends HTMLElement
 * @link constructor
 * @link observedAttributes
 * @link connectedCallback
 * @link disconnectedCallback
 * @link attributeChangedCallback
 * @link switch
 * @link switchOn
 * @link switchOff
 * @link toggle
 * @link setInitialState
 * @link updateAttributeSwitch
 * @since 0.6.0
 * */
export class HeadlessToggle extends HTMLElement {
  private readonly button: HTMLButtonElement

  constructor() {
    super()
    this.button = this.querySelector("button[aria-checked]")!
    this.setAttribute("role", "switch")
    this.tabIndex = -1
    this.updateAttributeSwitch(String(this.dataset.switch))
  }

  /**
   * Observe attributes that change
   */
  static get observedAttributes() {
    return ["data-switch"]
  }

  private get datasetSwitch(): NodeListOf<HTMLElement> {
    return this.querySelectorAll("[data-switch]")
  }

  connectedCallback() {
    this.button.addEventListener("click", this.switch.bind(this))
    this.button.addEventListener("keydown", this.switch.bind(this))
    this.setInitialState()
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this.switch)
    this.button.removeEventListener("keydown", this.switch)
  }

  /**
   * Callback then attribute changed
   * @param property
   * @param oldValue
   * @param newValue
   */
  attributeChangedCallback(property: any, oldValue: any, newValue: any) {
    if (property === "data-switch" && oldValue !== newValue) {
      this.updateAttributeSwitch(newValue)
    }
  }

  /**
   * Use keyboard and mouse events to change state
   * @param event
   * @private
   * @return void
   */
  private switch(event: MouseEvent | KeyboardEvent): void {
    if ((event instanceof KeyboardEvent && event.type === "keydown" && keycodeEquals(["Space", "Enter"], event)) || (event instanceof MouseEvent && event.type === "click")) {
      event.preventDefault()
      this.toggle()
    }
  }

  /**
   * Set aria-checked to true
   * @private
   * @return void
   */
  private switchOn(): void {
    this.button.ariaChecked = "true"
    this.dataset.switch = "on"
  }

  /**
   * Set aria-checked to false
   * @private
   * @return void
   */
  private switchOff(): void {
    this.button.ariaChecked = "false"
    this.dataset.switch = "off"
  }

  /**
   * Toggle aria-checked
   * @private
   * @return void
   */
  private toggle(): void {
    if (this.ariaDisabled === "true") return
    this.button.ariaChecked === "true" ? this.switchOff() : this.switchOn()
  }

  /**
   * Set initial state of switch attribute
   * @private
   * @return void
   */
  private setInitialState(): void {
    if (this.button.ariaChecked === "true") {
      this.dataset.switch = "on"
    } else if (this.button.ariaChecked === "false") {
      this.dataset.switch = "off"
    }
  }

  private updateAttributeSwitch(value: string): void {
    this.datasetSwitch.forEach((item: HTMLElement) => (item.dataset.switch = value))
  }
}

customElements.define("headless-toggle", HeadlessToggle)
