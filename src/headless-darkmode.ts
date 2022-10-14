import { keycodeEquals } from "./utils";
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
 * @since 0.2.4
 * */
export class HeadlessDarkMode extends HTMLElement {
  private button: HTMLButtonElement | HTMLElement | null;
  constructor() {
    super();
    this.button = this.querySelector('button')
    this.dataset.theme = this.themeData
  }

  connectedCallback() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark')
    }else {
      document.documentElement.classList.remove('dark')
    }
    this.button?.addEventListener('click', this.toggleTheme.bind(this))
    this.button?.addEventListener('keydown', this.toggleThemeWithKeyboard.bind(this))

  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', this.toggleTheme)
  }

  /**
   * Check if mode is equal to 'dark'
   * @return Boolean
   * */
  private get isDarkMode(): Boolean {
    return localStorage.theme === `dark` || (!(`theme` in localStorage) && window.matchMedia(`(prefers-color-scheme: dark)`).matches)
  }

  /**
   * Toggle theme using mouse click event
   * */
  private toggleTheme(event: any): void {
    event.preventDefault()
    if (!this.isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  /**
   * Toggle Theme using keyboard space or enter key
   * @return void
   * */
  private toggleThemeWithKeyboard(event: any): void {
    event.preventDefault()
    if (keycodeEquals(["Space", "Enter"], event)) {
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
}

customElements.define('headless-darkmode', HeadlessDarkMode)
