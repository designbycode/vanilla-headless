import { keycodeEquals } from "./utils";
/**
 * Class for HeadlessRating
 * @class
 * @extends HTMLElement
 * @link constructor
 * @link getReadOnly
 * @link checked
 * @link checkedType
 * @link init
 * @link connectedCallback
 * @link disconnectedCallback
 * @link attributeChangedCallback
 * @link observedAttributes
 * @link setChecked
 * @link updateRatingValue
 * @link setCheckedToNextItem
 * @link setCheckedToPreviousItem
 * @link handleClick
 * @link handleKeydown
 * @since 0.3.1
 * */
export class HeadlessRating extends HTMLElement {
  private readonly radioButtons: NodeListOf<HTMLElement>
  private readonly rating: number
  private readonly dataFields: NodeListOf<HTMLElement>
  private firstRadioButton: HTMLElement | null
  private lastRadioButton: HTMLElement | null
  private value: string

  constructor() {
    super()
    this.radioButtons = this.querySelectorAll("[role=radio], [type=radio]")
    this.rating = parseInt(this.dataset.ratingValue!) || 0
    this.value = this.rating.toString()
    this.dataFields = this.querySelectorAll("[data-rating-value]")
    this.firstRadioButton = null
    this.lastRadioButton = null
    this.init()
  }

  /**
   * Allow element update values with mouse and keyboard events
   * @default true
   * @return boolean
   * */
  private get getReadOnly(): boolean {
    return this.getAttribute("read-only") == "true" || (this.hasAttribute("read-only") && this.getAttribute("read-only") !== "false")
  }

  /**
   * Check the type of element that is used and add 'checked' or 'aria-checked' as needed
   * @return void
   * */
  private checked(value: any, bool: boolean): void {
    if (this.checkedType(value) === "checked") {
      bool ? value.setAttribute("checked", "checked") : value.removeAttribute("checked")
    } else if (this.checkedType(value) === "aria-checked") {
      value.ariaChecked = bool
    }
  }

  /**
   * Determinants what kind of HTMLElement is use, so that it attach check if input element or aria-checked if not
   * @return string
   * */
  private checkedType = (type: HTMLElement | HTMLInputElement): string => {
    return type.nodeName.toLowerCase() === "input" ? "checked" : "aria-checked"
  }

  /**
   * Initialize in constructor
   * @return void
   * */
  private init(): void {
    this.radioButtons.forEach((button: any) => {
      button.tabIndex = -1
      this.checked(button, false)
      if (!this.firstRadioButton) {
        this.firstRadioButton = button
      }
      this.lastRadioButton = button
    })

    this.radioButtons.forEach((button: HTMLElement, index: number) => {
      button.dataset.rating = (index + 1).toString()
    })

    if (this.rating && this.rating <= this.radioButtons.length - 1) {
      this.radioButtons[this.rating].tabIndex = 0
      this.checked(this.radioButtons[this.rating], true)
    } else {
      this.value = this.firstRadioButton?.getAttribute("data-rating")! || "1"
      this.dataset.ratingValue = <string>this.value.toString()
      this.firstRadioButton && (this.firstRadioButton.tabIndex = 0)
      this.firstRadioButton?.setAttribute(this.checkedType(this.firstRadioButton), "true")
    }
  }

  connectedCallback() {
    this.radioButtons.forEach((button) => button.addEventListener("click", this.handleClick.bind(this)))
    this.radioButtons.forEach((button) => button.addEventListener("keydown", this.handleKeydown.bind(this)))
    this.dataFields.forEach((field) => {
      field.setAttribute("data-rating-value", this.value)
    })
  }

  disconnectedCallback() {
    this.radioButtons.forEach((button) => button.removeEventListener("click", this.handleClick))
    this.radioButtons.forEach((button) => button.removeEventListener("keydown", this.handleKeydown))
  }

  attributeChangedCallback(property: any, oldValue: any, newValue: any) {
    if (oldValue !== newValue && property === "data-rating-value") {
      this.dataFields.forEach((field) => {
        field.setAttribute("data-rating-value", newValue)
      })
    }
  }

  static get observedAttributes() {
    return ["data-rating-value"]
  }

  /**
   * Make the current selected target to check or aria-checked
   * @return void
   * */
  private setChecked(currentTarget: any): void {
    if (this.getReadOnly) return
    this.tabIndex = -1
    this.radioButtons.forEach((button) => {
      this.checked(button, false)
      button.tabIndex = -1
    })
    this.updateRatingValue(currentTarget)
    this.checked(currentTarget, true)
    currentTarget.tabIndex = 0
    currentTarget.focus()
  }

  /**
   * Update rating value by using value if type of input:radio else update using 'data-rating'
   * @return void
   * */
  private updateRatingValue(target: any): void {
    if (target.nodeName.toLowerCase() === "input" && target.type === "radio" && target.value) {
      this.dataset.ratingValue = target.value
    } else {
      this.dataset.ratingValue = target.getAttribute("data-rating")
    }
  }

  /**
   * Marks the next element in list to checked|aria-checked
   * @return void
   * */
  private setCheckedToNextItem(currentTarget: HTMLElement): void {
    if (currentTarget === this.lastRadioButton) {
      this.setChecked(this.firstRadioButton)
    } else {
      this.setChecked(this.radioButtons[Array.from(this.radioButtons).indexOf(currentTarget) + 1])
    }
  }

  /**
   * Marks the previous element in list to checked|aria-checked
   * @return void
   * */
  private setCheckedToPreviousItem(currentTarget: HTMLElement): void {
    if (currentTarget === this.firstRadioButton) {
      this.setChecked(this.lastRadioButton)
    } else {
      this.setChecked(this.radioButtons[Array.from(this.radioButtons).indexOf(currentTarget) - 1])
    }
  }

  /**
   * Handle click events on radio element
   * @return void
   * */
  private handleClick(event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.setChecked(event.currentTarget)
  }

  /**
   * Handle keyboard events on radio element
   * @return void
   * */
  handleKeydown(event: any): void {
    event.preventDefault()
    event.stopPropagation()
    if (this.getReadOnly) return
    if (keycodeEquals(["Space"], event)) {
      this.setChecked(event.currentTarget)
    }
    if (keycodeEquals(["ArrowDown", "ArrowRight"], event)) {
      this.setCheckedToNextItem(event.currentTarget)
    }
    if (keycodeEquals(["ArrowUp", "ArrowLeft"], event)) {
      this.setCheckedToPreviousItem(event.currentTarget)
    }
  }
}

customElements.define("headless-rating", HeadlessRating)
