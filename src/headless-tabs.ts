import {HeadlessDisclosure} from "./headless-disclosure"

/**
 * Class for disclosure
 * @class
 * @augments HeadlessDisclosure
 * @link toggleVisibility
 * @since 1.3.0
 * */

export class HeadlessTabs extends HeadlessDisclosure {
  constructor() {
    super()
    this.setAttribute("role", "tablist")
  }

  protected toggleVisibility(event: any): void {
    const target = this.childSection(event.target) as HTMLElement | null
    const currentButton = event.target as HTMLButtonElement
    const allButtons = Array.from(this.buttons || [])

    if (currentButton.getAttribute("aria-expanded") === "false") {
      allButtons.forEach((button) => {
        if (button !== currentButton) {
          button.setAttribute("aria-expanded", "false")
          const section = this.childSection(button) as HTMLElement | null
          this.changeHidden(section, true)
        }
      })

      currentButton.setAttribute("aria-expanded", "true")
      this.changeHidden(target, false)
    }
  }
}

customElements.define("headless-tabs", HeadlessTabs)
