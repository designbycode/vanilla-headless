import { keycodeEquals } from "./utils"
/**
 * Class for ScrollToTop
 * @class
 * @augments HTMLButtonElement
 * */
export class HeadlessScrollTop extends HTMLButtonElement {
  #displayProperty: string

  constructor() {
    super()
    this.#displayProperty = "none"
    this.hiddenAttribute = true
    this.setAttribute("aria-pressed", "false")
  }

  /**
   * Assign integer to scroll to offset top
   * @return number
   * */
  get offset(): number | null {
    return parseInt(this.getAttribute("offset")!)
  }

  get scrollOffset(): number {
    return parseInt(this.getAttribute("scroll-offset")!) || 100
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
    this.addEventListener("click", this.scrollTopAnimation.bind(this))
    this.addEventListener("mousedown", this.buttonPressEvents.bind(this))
    this.addEventListener("mouseup", this.buttonPressEvents.bind(this))
    this.addEventListener("keydown", this.scrollUpOnKeyDown.bind(this))
    this.addEventListener("keydown", this.buttonPressEvents.bind(this))
    this.addEventListener("keyup", this.buttonPressEvents.bind(this))
    window.addEventListener("scroll", this.hideButtonOnScroll.bind(this))
    window.addEventListener("keydown", this.scrollUpOnCtrlHome.bind(this))
    this.#displayProperty = window.getComputedStyle(this).display
    if (this.hiddenAttribute) {
      this.style.display = "none"
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.scrollTopAnimation)
    this.removeEventListener("mousedown", this.buttonPressEvents)
    this.removeEventListener("mouseup", this.buttonPressEvents)
    this.removeEventListener("keydown", this.scrollUpOnKeyDown)
    this.removeEventListener("keydown", this.buttonPressEvents)
    this.removeEventListener("keyup", this.buttonPressEvents)
    window.removeEventListener("scroll", this.hideButtonOnScroll)
    window.removeEventListener("keydown", this.scrollUpOnCtrlHome)
  }

  private buttonPressEvents(event: KeyboardEvent | MouseEvent): void {
    if (event.type === "keydown" || event.type === "mousedown") {
      this.setAttribute("aria-pressed", "true")
    }

    if (event.type === "keyup" || event.type === "mouseup") {
      this.setAttribute("aria-pressed", "false")
    }
  }

  /**
   * Animate to top of window
   * */
  private scrollTopAnimation(): void {
    window.scrollTo({ top: this.offset || 0, behavior: "smooth" })
  }

  /**
   * Scroll to top by pressing control + Home key
   * @return void
   * */
  private scrollUpOnCtrlHome(event: KeyboardEvent): void {
    if (event.ctrlKey && keycodeEquals(["Home"], event)) {
      event.preventDefault()
      this.scrollTopAnimation()
    }
  }

  /**
   * Scroll to top by pressing Space or Enter white focus is on button
   * @return void
   * */
  private scrollUpOnKeyDown(event: KeyboardEvent): void {
    if (keycodeEquals(["Space", "Enter"], event)) {
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
      this.setAttribute("aria-pressed", "false")
    } else {
      this.hiddenAttribute = false
      this.style.display = this.#displayProperty
    }
  }
}

customElements.define("headless-scrolltop", HeadlessScrollTop, { extends: "button" })
