import HeadlessButton from "./headless-button"
/**
 * @class HeadlessGoBack
 * @extends HeadlessButton
 * @link allowedKeyCodes
 * @link allowedKeyCodesWithCtrl
 * @link constructor
 * @link connectedCallback
 * @link disconnectedCallback
 * @link triggerEvents
 * @since 0.3.2
 * */
export class HeadlessGoBack extends HeadlessButton {
  constructor() {
    super()
  }

  /**
   * Allowed keycode that may trigger events
   * @override HeadlessButton
   * @return array
   * */
  protected get allowedKeyCodes(): string[] {
    return super.allowedKeyCodes
  }

  /**
   * Allowed keycode that may trigger events
   * @override HeadlessButton
   * @return array
   * */
  protected get allowedKeyCodesWithCtrl(): string[] | never {
    return []
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("click", this.triggerEvents.bind(this))
    this.addEventListener("keydown", this.triggerEvents.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("click", this.triggerEvents)
    this.removeEventListener("keydown", this.triggerEvents)
  }

  /**
   * Trigger mouse and keyboard event for navigation back
   * @param event
   * @private
   * @return void
   */
  private triggerEvents(event: MouseEvent | KeyboardEvent): void {
    if (
      event instanceof MouseEvent ||
      (event instanceof KeyboardEvent && this.allowedKeyCodes.includes(event.code)) ||
      (event instanceof KeyboardEvent && event.ctrlKey && this.allowedKeyCodes.includes(event.code))
    ) {
      event.preventDefault()
      event.stopPropagation()
      window.history.back()
    }
  }
}

customElements.define("headless-goback", HeadlessGoBack, { extends: "button" })
