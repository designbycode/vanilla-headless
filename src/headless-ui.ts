import { createPopper, Placement } from "@popperjs/core"
import { keycodeEquals } from "./utils"

export default class HeadlessUi extends HTMLElement {
  protected readonly button: HTMLButtonElement | null
  protected readonly mainContainer: HTMLElement | null
  protected createPopper: any

  constructor() {
    super()
    this.button = this.querySelector("[aria-haspopup][aria-expanded]")
    this.mainContainer = this.querySelector("[aria-labelledby]")
    if (!this.button) {
      throw new Error(`A button element with attribute "aria-haspopup" and "aria-expanded" or is="button" is required`)
    }
    if (!this.mainContainer) {
      throw new Error(`A div element with attribute "aria-labelledby" or is="panel" is required`)
    }

    this.createPopper = createPopper

    console.log(this.placement)
  }

  protected get placement() {
    return this.getAttribute(<Placement>"placement") || <Placement>"bottom-end"
  }

  protected get placementFallback() {
    return this.getAttribute(<Placement>"placement-fallback")
  }

  protected get expanded() {
    return this.button?.getAttribute("aria-expanded") === "true"
  }

  protected set expanded(value: boolean) {
    this.button?.setAttribute("aria-expanded", value.toString())
  }

  protected get hiddenAttribute() {
    return !!this.mainContainer?.hasAttribute("hidden")
  }

  protected set hiddenAttribute(value: boolean) {
    if (this.mainContainer) {
      this.mainContainer.hidden = value
    }
  }

  protected get isDisabled() {
    return this.button?.hasAttribute("disabled")
  }

  protected get popper() {
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

    this.addEventListeners()

    this.popper && this.popperInit()
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  protected addEventListeners() {
    this.button?.addEventListener("click", this.toggleOpen.bind(this))
    this.button?.addEventListener("keydown", this.buttonKeyEvent.bind(this))
    window.addEventListener("keydown", this.closeOnExitKeyDown.bind(this))
    window.addEventListener("click", this.closeOnClickOutSide.bind(this))
    window.addEventListener("resize", this.closeOnResize.bind(this))
  }

  protected removeEventListeners() {
    this.button?.removeEventListener("click", this.toggleOpen)
    this.button?.removeEventListener("keydown", this.buttonKeyEvent)
    window.removeEventListener("keydown", this.closeOnExitKeyDown)
    window.removeEventListener("click", this.closeOnClickOutSide)
    window.removeEventListener("resize", this.closeOnResize)
  }

  protected popperInit() {
    this.mainContainer &&
      this.createPopper(this, this.mainContainer, {
        placement: <Placement>this.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
          {
            name: "flip",
            options: {
              // fallbackPlacements: [this.placement, this.placementFallback],
            },
          },
        ],
      })
  }

  protected open() {
    this.expanded = true
    this.hiddenAttribute = false
    this.popper && this.popperInit()
  }

  protected close() {
    this.expanded = false
    this.hiddenAttribute = true
  }

  protected toggleOpen() {
    this.expanded ? this.close() : this.open()
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
    }
  }

  protected closeOnClickOutSide(event: MouseEvent) {
    // @ts-ignore
    if (!this.contains(event.target) && this.expanded) {
      this.close()
    }
  }

  protected closeOnExitKeyDown(event: KeyboardEvent) {
    keycodeEquals(["Escape"], event) && this.close()
  }

  // @ts-ignore
  protected closeOnResize(event) {
    this.close()
  }
}
