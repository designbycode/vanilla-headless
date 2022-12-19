import {HeadlessDropdown} from "./headless-dropdown";


export class HeadlessSelect extends HeadlessDropdown {
    private readonly input: HTMLInputElement | null;
    private readonly form: HTMLFormElement | null;
    private readonly dataValue: HTMLElement | null;
    constructor() {
        super();
        this.form = this.querySelector('form')
        this.input = this.querySelector('input[data-select="input"]')
        this.dataValue = this.querySelector('[data-select="value"]')
    }

    /**
     * Mouse event for selecting menuItem and then closing element with attribute aria-labelledby
     * */
    protected itemClickEvent(event: any): void {
        event.preventDefault()
        super.itemClickEvent(event)

        if (this.input) {
            this.input.value = event.target.dataset.value
        }

        if (this.dataValue) {
            this.dataValue.innerText = event.target.dataset.value
        }

        if(this.form) {
            this.form.submit()
        }
    }


}


customElements.define('headless-select', HeadlessSelect)