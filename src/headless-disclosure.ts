/**
 * Class for disclosure
 * @class
 * @augments HTMLElement
 * */
export class HeadlessDisclosure extends HTMLElement {
  private buttons: NodeListOf<HTMLButtonElement> | null

  constructor() {
    super()
    this.buttons = this.querySelectorAll(`button[aria-controls]`)
  }

  connectedCallback() {
    this.buttons?.forEach((button) => {
      button.addEventListener("click", this.toggleVisibility.bind(this))
    })
    this.hideContent()
  }

  disconnectedCallback() {
    this.buttons?.forEach((button) => {
      button.removeEventListener("click", this.toggleVisibility)
    })
  }

  /**
   * Find element with ID that matches button with attribute aria-controls
   * @parma value
   * */
  childSection(value: HTMLElement | null) {
    return this.querySelector(`#${value?.getAttribute("aria-controls")}`)
  }

  /**
   * Update defined htmlElement hidden attribute
   * @param elem
   * @param value
   * */
  private changeHidden(elem: any, value: boolean) {
    if (elem) {
      elem.hidden = value
    }
  }

  /**
   * Change visibility of element with id that matches button with attribute aria-controls
   * */
  private hideContent(): void {
    this.buttons?.forEach((button) => {
      if (button.getAttribute("aria-expanded") === "false") {
        const section = this.childSection(button) as HTMLElement | null
        this.changeHidden(section, true)
      }
    })
  }

  /**
   * Event for toggling visibility of element
   * @return event
   * */
  private toggleVisibility(event: any): void {
    const target = this.childSection(event.target) as HTMLElement | null
    if (event.target.getAttribute("aria-expanded") === "false") {
      event.target.setAttribute("aria-expanded", "true")
      this.changeHidden(target, false)
    } else {
      event.target.setAttribute("aria-expanded", "false")
      this.changeHidden(target, true)
    }
  }
}

customElements.define("headless-disclosure", HeadlessDisclosure)