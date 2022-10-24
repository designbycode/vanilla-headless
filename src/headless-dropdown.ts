import HeadlessUi from "./headless-ui"
import { keycodeEquals } from "./utils"
/**
 * Class for dropdown menus
 * @class
 * @augments HeadlessUi
 * @link constructor
 * @link current
 * @link addEventListeners
 * @link removeEventListeners
 * @link buttonKeyEvent
 * @link close
 * @link itemsKeyEvent
 * @link navigateKeys
 * @link itemClickEvent
 * @link markAsCurrent
 * @link focusOnElement
 * @since 0.1.4
 * */
class HeadlessDropdown extends HeadlessUi {
  private readonly menuItems: NodeListOf<HTMLElement>
  #indexPointer: number
  #currentSelectedItem: number

  constructor() {
    super()
    this.#indexPointer = 0
    this.menuItems = this.querySelectorAll(`[role="menuitem"]`)
    this._current = this.getAttribute("current") || "page"
    this.#currentSelectedItem = -1
    if (this.menuItems.length < 1) {
      console.log(
        `%c headless-dropdown require at least 1 item with attribute role fof menuitem`,
        `color:red;background-color:pink;font-size:18px; padding: 3px; border-radius: 3px; border: red 1px solid;`
      )
    }
  }

  public _current: string

  /**
   * Use current attribute to change the aria-current type on menu items
   * Can be any of the following:  page | step | location | date | time | true | false
   * @return string
   * */
  private get current(): string {
    return this.getAttribute("current") || "page"
  }

  /**
   * Bind event listeners to connectedCallback
   * @override
   * */
  protected addEventListeners(): void {
    super.addEventListeners()
    this.menuItems.forEach((item) => item.addEventListener("keydown", this.itemsKeyEvent.bind(this)))
    this.menuItems.forEach((item) => item.addEventListener("click", this.itemClickEvent.bind(this)))
  }

  /**
   * Remove event listeners to connectedCallback
   * @override
   * */
  protected removeEventListeners(): void {
    super.removeEventListeners()
    this.menuItems.forEach((item) => item.removeEventListener("keydown", this.itemsKeyEvent))
    this.menuItems.forEach((item) => item.removeEventListener("click", this.itemClickEvent))
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

    if (keycodeEquals(["ArrowDown", "ArrowUp"], event)) {
      event.preventDefault()
      this.open()
      this.focusOnElement(this.#indexPointer)
    }
  }

  /**
   * Close htmlElement with attribute of aria-labelledby
   * @override
   * */
  protected close(): void {
    super.close()
    this.#indexPointer = 0
  }

  /**
   * Keyboard event for interacting with menuItems
   * @return void
   * */
  private itemsKeyEvent(event: KeyboardEvent): void {
    this.navigateKeys(event)
    keycodeEquals(["Enter"], event) && this.markAsCurrent(event)
    this.focusOnElement(this.#indexPointer)
  }

  /**
   * Keyboard event for navigating menuItems
   * */
  private navigateKeys(event: KeyboardEvent): void {
    if (!keycodeEquals(["Enter"], event)) event.preventDefault()
    keycodeEquals(["Enter"], event) && this.close()
    keycodeEquals(["Space"], event) && this.close()
    keycodeEquals(["ArrowDown", "ArrowRight"], event) && this.#indexPointer < this.menuItems.length - 1 && this.#indexPointer++
    keycodeEquals(["ArrowUp", "ArrowLeft"], event) && this.#indexPointer > 0 && this.#indexPointer--
    if (keycodeEquals(["Home"], event) && this.#indexPointer > 0) this.#indexPointer = 0
    if (keycodeEquals(["End"], event) && this.#indexPointer < this.menuItems.length) this.#indexPointer = this.menuItems.length - 1
    if (!event.shiftKey && keycodeEquals(["Tab"], event)) {
      this.#indexPointer++
      if (this.#indexPointer > this.menuItems.length - 1) {
        console.log(this.nextSibling)
      }
    }
    if (event.shiftKey && keycodeEquals(["Tab"], event)) {
      this.#indexPointer--
    }
  }

  /**
   * Mouse event for selecting menuItem and then closing element with attribute aria-labelledby
   * */
  private itemClickEvent(event: MouseEvent): void {
    this.markAsCurrent(event)
    this.close()
  }

  /**
   * Mark selected with menuItem with aria-current and resetting rest menuItem to have no aria-current
   * */
  private markAsCurrent(event: any): void {
    this.menuItems.forEach((item) => item.removeAttribute("aria-current"))
    this.#currentSelectedItem = Array.from(this.menuItems).indexOf(event.target)
    this.#currentSelectedItem >= 0 && this.menuItems[this.#currentSelectedItem].setAttribute("aria-current", this.current)
  }

  /**
   * Add focus to selected menuItem
   * */
  private focusOnElement(index: number): void {
    this.menuItems[index]?.focus()
  }
}

customElements.define("headless-dropdown", HeadlessDropdown)
