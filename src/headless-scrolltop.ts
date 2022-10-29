import HeadlessButton from "./headless-button"
/**
 * Class for ScrollToTop
 * @class
 * @extends HeadlessButton
 * @augments offset
 * @augments scrollOffset
 * @link allowedKeyCodes
 * @link allowedKeyCodesWithCtrl
 * @link constructor
 * @link hiddenAttribute
 * @link connectedCallback
 * @link disconnectedCallback
 * @link scrollTopAnimation
 * @link scrollUpOnCtrlHome
 * @link scrollUpOnKeyDown
 * @link hideButtonOnScroll
 * @since 0.2.0
 * */
export class HeadlessScrollTop extends HeadlessButton {
  #displayProperty: string

  constructor() {
    super()
    this.#displayProperty = "none"
    this.hiddenAttribute = true
  }

  /**
   * Assign integer to scroll to offset top
   * @return number
   * */
  get offset(): number | null {
    return parseInt(this.getAttribute("offset")!)
  }

  /**
   * Scroll offset from top to show
   * @return number
   */
  get scrollOffset(): number {
    return parseInt(this.getAttribute("scroll-offset")!) || 100
  }

  /**
   * List of key to trigger event
   * @protected
   * @return string[]
   */
  protected get allowedKeyCodes(): string[] {
    return super.allowedKeyCodes
  }

  /**
   * List of key to trigger event with Ctrl key
   * @protected
   * @return string[]
   */
  protected get allowedKeyCodesWithCtrl(): string[] {
    return ["Home"]
  }

  /**
   * Check if button element has an attribute of hidden
   * @return boolean
   * */
  protected get hiddenAttribute(): boolean {
    return !!this?.hasAttribute("hidden")
  }

  /**
   * Set button element hidden value
   * @param value
   * */
  protected set hiddenAttribute(value: boolean) {
    this.hidden = value
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("click", this.scrollTopAnimation.bind(this))
    this.addEventListener("keydown", this.scrollUpOnKeyDown.bind(this))
    window.addEventListener("scroll", this.hideButtonOnScroll.bind(this))
    window.addEventListener("keydown", this.scrollUpOnCtrlHome.bind(this))
    this.#displayProperty = window.getComputedStyle(this).display
    if (this.hiddenAttribute) {
      this.style.display = "none"
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("click", this.scrollTopAnimation)
    this.removeEventListener("keydown", this.scrollUpOnKeyDown)
    window.removeEventListener("scroll", this.hideButtonOnScroll)
    window.removeEventListener("keydown", this.scrollUpOnCtrlHome)
  }

  /**
   * Animate to top of window
   * @return void
   * */
  private scrollTopAnimation(): void {
    window.scrollTo({ top: this.offset || 0, behavior: "smooth" })
  }

  /**
   * Scroll to top by pressing control + Home key
   * @return void
   * */
  private scrollUpOnCtrlHome(event: KeyboardEvent): void {
    if (event instanceof KeyboardEvent && event.ctrlKey && this.allowedKeyCodesWithCtrl.includes(event.code)) {
      event.preventDefault()
      this.scrollTopAnimation()
    }
  }

  /**
   * Scroll to top by pressing Space or Enter white focus is on button
   * @return void
   * */
  private scrollUpOnKeyDown(event: KeyboardEvent): void {
    if (this.allowedKeyCodes.includes(event.code)) {
      event.preventDefault()
      this.scrollTopAnimation()
    }
  }

  /**
   * Hide button if scroll position is at top of window
   * @return void
   * */
  private hideButtonOnScroll(): void {
    if (document.documentElement.scrollTop < this.scrollOffset) {
      this.hiddenAttribute = true
      this.style.display = "none"
    } else {
      this.hiddenAttribute = false
      this.style.display = this.#displayProperty
    }
  }
}

customElements.define("headless-scrolltop", HeadlessScrollTop, { extends: "button" })
