import { keycodeEquals } from "./utils"

/**
 * Class for HeadlessDarkMode
 * @class
 * @extends HTMLElement
 * @link constructor
 * @link connectedCallback
 * @link disconnectedCallback
 * @link isDarkMode
 * @link toggleTheme
 * @link toggleThemeWithKeyboard
 * @link themeData
 * @link observedAttributes
 * @link attributeChangedCallback
 * @link updateAllDateThemeAttributes
 * @since 0.3.1
 * */
export class HeadlessDarkMode extends HTMLElement {
  private button: HTMLButtonElement | HTMLElement | null
  private dataTheme: NodeListOf<HTMLElement>

  constructor() {
    super()
    this.button = this.querySelector("button")
    if (!this.button.hasAttribute("aria-checked")) {
      this.button.setAttribute("aria-checked", "false")
    }
    this.dataset.theme = this.themeData || "dark"
    this.dataTheme = this.querySelectorAll("[data-theme]")
    this.updateAllDateThemeAttributes(this.dataset.theme)
  }

  connectedCallback() {
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    this.button?.addEventListener("click", this.toggleTheme.bind(this))
    this.button?.addEventListener("keydown", this.toggleThemeWithKeyboard.bind(this))
  }

  disconnectedCallback() {
    this.button?.removeEventListener("click", this.toggleTheme)
    this.button?.removeEventListener("keydown", this.toggleThemeWithKeyboard)
  }

  /**
   * Check if mode is equal to 'dark'
   * @return boolean
   * */
  private get isDarkMode(): boolean {
    return localStorage.theme === `dark` || (!(`theme` in localStorage) && window.matchMedia(`(prefers-color-scheme: dark)`).matches)
  }

  /**
   * Toggle theme using mouse click event
   * */
  private toggleTheme(event: any): void {
    event.preventDefault()
    if (!this.isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
      this.dataset.theme = "dark"
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
      this.dataset.theme = "light"
    }
  }

  /**
   * Toggle Theme using keyboard space or enter key
   * @return void
   * */
  private toggleThemeWithKeyboard(event: any): void {
    if (keycodeEquals(["Space", "Enter"], event)) {
      event.preventDefault()
      this.toggleTheme(event)
    }
  }

  /**
   * Return theme name from localStorage
   * @return string
   * */
  private get themeData(): string {
    return localStorage.theme
  }

  /**
   * Observe attributes that change
   */
  static get observedAttributes() {
    return ["data-theme"]
  }

  /**
   * Callback then attribute changed
   * @param property
   * @param oldValue
   * @param newValue
   */
  attributeChangedCallback(property: any, oldValue: any, newValue: any) {
    if (property === "data-theme" && oldValue !== newValue) {
      this.updateAllDateThemeAttributes(newValue)
    }
  }

  /**
   * Update all attributes data-theme
   * @param value
   * @private
   */
  updateAllDateThemeAttributes(value: string) {
    this.dataTheme.forEach((data) => (data.dataset.theme = value))
  }
}

customElements.define("headless-darkmode", HeadlessDarkMode)
