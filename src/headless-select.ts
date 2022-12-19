import {HeadlessDropdown} from "./headless-dropdown";


export class HeadlessSelect extends HeadlessDropdown {
    private input: HTMLInputElement;
    private buttonValue: Element;
    private readonly form: HTMLFormElement | null;
    constructor() {
        super();
        this.input = this.querySelector('input')
        this.buttonValue = this.querySelector('#button')
        this.form = this.querySelector('form')
    }

    /**
     * Mouse event for selecting menuItem and then closing element with attribute aria-labelledby
     * */
    protected itemClickEvent(event: any): void {
        event.preventDefault()
        super.itemClickEvent(event)
        this.input.value = event.target.dataset.value

        if(!this.form) {
            this.form.submit()
        }
    }


}


customElements.define('headless-select', HeadlessSelect)