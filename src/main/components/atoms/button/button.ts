/**
 * @author Jonas.Fournel
 * @fileOverview
 */

import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('cnir-button')
export class Button extends LitElement {

    static styles = css`p { color: blue }`;

    @property()
    label = 'default-label';

    render() {
        return html`
            <button type="button" class="cnir-button">
                ${this.label}
            </button>
        `;
    }
}
