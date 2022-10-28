import { keycodeEquals } from "./utils"
import { createPopper, Placement } from "@popperjs/core"
import HeadlessButton from "./headless-button"
/**
 * Abstract class for element that use popups
 * @class
 * @link constructor
 * @link placement getter setter
 * @link offsets
 * @link expanded
 * @link hiddenAttribute
 * @link isDisabled
 * @link popper
 * @link connectedCallback
 * @link disconnectedCallback
 * @link checkRequirements
 * @link addEventListeners
 * @link removeEventListeners
 * @link popperInit
 * @link open
 * @link close
 * @link toggleOpen
 * @link buttonKeyEvent
 * @link closeOnClickOutSide
 * @link closeOnExitKeyDown
 * */
export default class HeadlessUi extends HTMLElement {
  protected readonly button: HTMLButtonElement | HeadlessButton | null
  protected readonly mainContainer: HTMLElement | null
  protected createPopper: any
  protected initialDisplayStyle: string

  constructor() {
    super()
    this.button = this.querySelector("[aria-haspopup][aria-expanded]")
    this.mainContainer = this.querySelector("[aria-labelledby]")
    this.createPopper = createPopper
    this.initialDisplayStyle = "block"
  }

  /**
   * Popper.js placement of htmlElement with attribute of aria-labelledby
   * @return any
   * */
  protected get placement(): any {
    return this.hasAttribute("placement") ? this.getAttribute("placement")?.split(/(?:,| )+/g) : [<Placement>"auto-start", <Placement>"auto-start"]
  }

  protected get offsets() {
    return (
      this.getAttribute("offsets")
        ?.split(/(?:,| )+/g)
        .map(function (x) {
          return parseInt(x, 10)
        }) || [0, 10]
    )
  }

  /**
   * Get boolean value of button attribute of aria-expanded
   * @return boolean
   * */
  protected get expanded(): boolean {
    return this.button?.getAttribute("aria-expanded") === "true"
  }

  /**
   * Set button aria-expanded value
   * @param value
   * */
  protected set expanded(value: boolean) {
    this.button?.setAttribute("aria-expanded", value.toString())
  }

  /**
   * Check if element with attribute aria-labelledby has an attribute of hidden
   * @return boolean
   * */
  protected get hiddenAttribute(): boolean {
    return !!this.mainContainer?.hasAttribute("hidden")
  }

  /**
   * Set element with attribute aria-labelledby hidden value
   * @param value
   * */
  protected set hiddenAttribute(value: boolean) {
    if (this.mainContainer) {
      this.mainContainer.hidden = value
    }
  }

  /**
   * Check if button with attribute aria-expanded and aria-haspopup is disabled
   * @return boolean | undefined
   * */
  protected get isDisabled(): boolean | undefined {
    return this.button?.hasAttribute("disabled")
  }

  /**
   * Enable Popper.js by checking if an attribute of popper or if popper attribute is equal to true
   * @return boolean
   * */
  protected get popper(): boolean {
    return this.getAttribute("popper") === "" || this.getAttribute("popper") === "true"
  }

  connectedCallback() {
    if (!this.expanded && !this.mainContainer?.hasAttribute("hidden")) {
      this.hiddenAttribute = true
    }

    if (this.expanded) {
      this.hiddenAttribute = !this.expanded
    }

    if (this.isDisabled || !this.expanded) {
      this.close()
    }

    this.mainContainer?.setAttribute("tabIndex", "-1")

    this.addEventListeners()

    this.popper && this.popperInit()

    this.checkRequirements()
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  /**
   * Check if required element is present
   * */
  protected checkRequirements() {
    if (!this.button) {
      console.log(
        `%c A button element with attribute "aria-haspopup" and "aria-expanded" is required`,
        `color:red;background-color:pink;font-size:18px; padding: 3px; border-radius: 3px; border: red 1px solid;`
      )
    }
    if (!this.mainContainer) {
      console.log(
        `%c A div element with attribute "aria-labelledby" is required`,
        `color:red;background-color:pink;font-size:18px; padding: 3px; border-radius: 3px; border: red 1px solid;`
      )
    }
  }

  /**
   * Bind event listeners to connectedCallback
   * */
  protected addEventListeners() {
    this.button?.addEventListener("click", this.toggleOpen.bind(this))
    this.button?.addEventListener("keydown", this.buttonKeyEvent.bind(this))
    window.addEventListener("keydown", this.closeOnExitKeyDown.bind(this))
    window.addEventListener("click", this.closeOnClickOutSide.bind(this))
  }

  /**
   * Remove event listeners to connectedCallback
   * */
  protected removeEventListeners(): void {
    this.button?.removeEventListener("click", this.toggleOpen)
    this.button?.removeEventListener("keydown", this.buttonKeyEvent)
    window.removeEventListener("keydown", this.closeOnExitKeyDown)
    window.removeEventListener("click", this.closeOnClickOutSide)
  }

  /**
   * Initialize popper.js with options
   * */
  protected popperInit() {
    this.mainContainer &&
      this.createPopper(this, this.mainContainer, {
        placement: <Placement>this.placement[0],
        modifiers: [
          {
            name: "offset",
            options: {
              offset: this.offsets,
            },
          },
          {
            name: "flip",
            options: {
              fallbackPlacements: [<Placement>this.placement[0], <Placement>this.placement[1]],
            },
          },
          {
            name: "arrow",
            options: {
              element: this.querySelector(`[data-popper-arrow]`),
              padding: 5,
            },
          },
        ],
      })
  }

  /**
   * Open htmlElement with attribute of aria-labelledby
   * */
  protected open() {
    this.expanded = true
    this.hiddenAttribute = false
    this.popper && this.popperInit()
    this.mainContainer && (this.mainContainer.style.display = this.initialDisplayStyle)
  }

  /**
   * Close htmlElement with attribute of aria-labelledby
   * */
  protected close(): void {
    this.expanded = false
    this.hiddenAttribute = true
    this.mainContainer && (this.mainContainer.style.display = "none")
  }

  /**
   * Toggle htmlElement with attribute of aria-labelledby
   * */
  protected toggleOpen() {
    this.expanded ? this.close() : this.open()
  }

  /**
   * Keyboard event for button with attribute of aria-expanded and aria-haspopup
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
    }
  }

  /**
   * Mouse event for closing htmlElement with attribute of aria-labelledby by clicking outside target element
   * */
  protected closeOnClickOutSide(event: MouseEvent) {
    // @ts-ignore
    if (!this.contains(event.target) && this.expanded) {
      this.close()
    }
  }

  /**
   * Keyboard event for closing htmlElement with attribute of aria-labelledby by pressing "Escape" key
   * */
  protected closeOnExitKeyDown(event: KeyboardEvent) {
    keycodeEquals(["Escape"], event) && this.close()
  }
}
