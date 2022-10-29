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
 * @since 0.6.0
 * */
export class HeadlessToggle extends HTMLElement {
  private readonly button: HTMLButtonElement

  constructor() {
    super()
    this.button = this.querySelector("button[aria-checked]")!
    this.setAttribute("role", "switch")
    this.tabIndex = -1
    if (this.button.ariaChecked === "true") {
      this.dataset.switch = "on"
    } else if (this.button.ariaChecked === "false") {
      this.dataset.switch = "off"
    }
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
   * @protected
   * @return void
   */
  protected switch(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof KeyboardEvent && event.type === "keydown" && keycodeEquals(["Space", "Enter"], event)) {
      event.preventDefault()
      this.toggle()
    }

    if (event instanceof MouseEvent && event.type === "click") {
      event.preventDefault()
      this.toggle()
    }
  }

  /**
   * Set aria-checked to true
   * @protected
   * @return void
   */
  protected switchOn(): void {
    this.button.ariaChecked = "true"
    this.dataset.switch = "on"
  }

  /**
   * Set aria-checked to false
   * @protected
   * @return void
   */
  protected switchOff(): void {
    this.button.ariaChecked = "false"
    this.dataset.switch = "off"
  }

  /**
   * Toggle aria-checked
   * @protected
   * @return void
   */
  protected toggle(): void {
    if (this.ariaDisabled === "true") return
    this.button.ariaChecked === "true" ? this.switchOff() : this.switchOn()
  }

  private updateAttributeSwitch(value: string): void {
    this.datasetSwitch.forEach((item: HTMLElement) => (item.dataset.switch = value))
  }
}

customElements.define("headless-toggle", HeadlessToggle)
