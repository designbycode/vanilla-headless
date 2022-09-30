import HeadlessUi from "./headless-ui"
import { keycodeEquals } from "./utils"

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
  }

  public _current: string

  private get current() {
    return this.getAttribute("current") || "page"
  }

  protected addEventListeners() {
    super.addEventListeners()
    this.menuItems.forEach((item) => item.addEventListener("keydown", this.itemsKeyEvent.bind(this)))
    this.menuItems.forEach((item) => item.addEventListener("click", this.itemClickEvent.bind(this)))
  }

  protected removeEventListeners() {
    super.removeEventListeners()
    this.menuItems.forEach((item) => item.removeEventListener("keydown", this.itemsKeyEvent))
    this.menuItems.forEach((item) => item.removeEventListener("click", this.itemClickEvent))
  }

  protected buttonKeyEvent(event: KeyboardEvent) {
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

  protected close() {
    super.close()
    this.#indexPointer = 0
  }

  private itemsKeyEvent(event: KeyboardEvent) {
    this.navigateKeys(event)
    keycodeEquals(["Enter"], event) && this.markAsCurrent(event)
    this.focusOnElement(this.#indexPointer)
  }

  private navigateKeys(event: KeyboardEvent) {
    keycodeEquals(["Enter"], event) && this.close()
    event.preventDefault()
    keycodeEquals(["Space"], event) && this.close()
    keycodeEquals(["ArrowDown", "ArrowRight"], event) && this.#indexPointer < this.menuItems.length - 1 && this.#indexPointer++
    keycodeEquals(["ArrowUp", "ArrowLeft"], event) && this.#indexPointer > 0 && this.#indexPointer--
    if (keycodeEquals(["Home"], event) && this.#indexPointer > 0) this.#indexPointer = 0
    if (keycodeEquals(["End"], event) && this.#indexPointer < this.menuItems.length) this.#indexPointer = this.menuItems.length - 1
  }

  private itemClickEvent(event: MouseEvent) {
    this.markAsCurrent(event)
    this.close()
  }

  // @ts-ignore
  private markAsCurrent(event) {
    this.menuItems.forEach((item) => item.removeAttribute("aria-current"))
    this.#currentSelectedItem = Array.from(this.menuItems).indexOf(event.target)
    this.#currentSelectedItem >= 0 && this.menuItems[this.#currentSelectedItem].setAttribute("aria-current", this.current)
  }

  private focusOnElement(index: number) {
    this.menuItems[index]?.focus()
  }
}

customElements.define("headless-dropdown", HeadlessDropdown)
