/**
 * @class HeadlessButton
 * @extends HTMLButtonElement
 * @link constructor
 * @link allowedKeyCodes
 * @link allowedKeyCodesWithCtrl
 * @link connectedCallback
 * @link disconnectedCallback
 * @link addEventListeners
 * @link removeEventListeners
 * @link buttonPressEvents
 * @since 0.3.2
 * */

export default class HeadlessButton extends HTMLButtonElement {
  constructor() {
    super()
  }

  /**
   * Allowed keycode that may trigger events
   * @return array
   * */
  protected get allowedKeyCodes(): string[] | never {
    return ["Space", "Enter"]
  }

  /**
   * Allowed keycode that may trigger events
   * @return array
   * */
  protected get allowedKeyCodesWithCtrl(): string[] | never {
    return []
  }

  connectedCallback() {
    this.addEventListeners()
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  /**
   * Adds EventListeners to connectedCallback
   * @return void
   * */
  protected addEventListeners(): void {
    this.addEventListener("mousedown", this.buttonPressEvents.bind(this))
    this.addEventListener("mouseup", this.buttonPressEvents.bind(this))
    this.addEventListener("keydown", this.buttonPressEvents.bind(this))
    this.addEventListener("keyup", this.buttonPressEvents.bind(this))
    this.addEventListener("blur", this.buttonPressEvents.bind(this))
  }

  /**
   * Remove EventListeners from disconnectedCallback
   * @return void
   * */
  protected removeEventListeners() {
    this.removeEventListener("mousedown", this.buttonPressEvents)
    this.removeEventListener("mouseup", this.buttonPressEvents)
    this.removeEventListener("keydown", this.buttonPressEvents)
    this.removeEventListener("keyup", this.buttonPressEvents)
    this.removeEventListener("blur", this.buttonPressEvents)
  }

  /**
   * Add button pressed event to keyboard, mouse and focus events
   * @return void
   * */
  protected buttonPressEvents(event: KeyboardEvent | MouseEvent | FocusEvent): void {
    if (
      (event instanceof KeyboardEvent && event.type === "keydown" && this.allowedKeyCodes.includes(event.code)) ||
      (event instanceof KeyboardEvent && event.type === "keydown" && event.ctrlKey && this.allowedKeyCodesWithCtrl.includes(event.code)) ||
      (event instanceof MouseEvent && event.type === "mousedown")
    ) {
      event.preventDefault()
      this.ariaPressed = "true"
      this.focus()
    }

    if (
      (event instanceof KeyboardEvent && event.type === "keyup" && this.allowedKeyCodes.includes(event.code)) ||
      (event instanceof KeyboardEvent && event.type === "keyup" && event.ctrlKey && this.allowedKeyCodesWithCtrl.includes(event.code)) ||
      (event instanceof MouseEvent && event.type === "mouseup") ||
      event instanceof FocusEvent
    ) {
      event.preventDefault()
      this.ariaPressed = "false"
    }
  }
}

customElements.define("headless-button", HeadlessButton, { extends: "button" })
