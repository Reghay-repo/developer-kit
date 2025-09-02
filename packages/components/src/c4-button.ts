import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * A professional, themeable button component for the Carrefour design system.
 *
 * @element c4-button
 * @slot - The default slot for the button's text/label.
 * @cssprop --c4-button-bg-color - The background color of the button.
 * @cssprop --c4-button-text-color - The text color of the button.
 * @cssprop --c4-button-primary-bg-color - Background color for primary variant.
 * @cssprop --c4-button-primary-text-color - Text color for primary variant.
 * @cssprop --c4-button-primary-bg-hover-color - Hover background for primary.
 * @cssprop --c4-button-secondary-bg-color - Background color for secondary variant.
 * @cssprop --c4-button-secondary-text-color - Text color for secondary variant.
 * @cssprop --c4-button-secondary-border-color - Border color for secondary.
 * @cssprop --c4-button-secondary-bg-hover-color - Hover background for secondary.
 * @cssprop --c4-button-disabled-bg-color - Background color when disabled.
 * @cssprop --c4-button-disabled-text-color - Text color when disabled.
 * @cssprop --c4-button-focus-ring-color - Focus ring color.
 * @cssprop --c4-button-font-size - Font size.
 * @cssprop --c4-button-padding - Padding.
 * @cssprop --c4-button-border-radius - Border radius.
 */
@customElement('c4-button')
export class C4Button extends LitElement {
    // Styles, properties, and render logic will go here

    /**
     * Defines the button's visual style.
     * @type {'primary' | 'secondary'}
     */
    @property({type: String, reflect: true})
    variant: 'primary' | 'secondary' = 'primary';

    /**
     * Disables the button, preventing user interaction.
     * @type {boolean}
     */
    @property({type: Boolean, reflect: true})
    disabled: boolean = false;


    static styles = css`
        :host {
            display: inline-block;

            /* Primary default values */
            --c4-button-primary-bg-color: #007bff;
            --c4-button-primary-text-color: #ffffff;
            --c4-button-primary-bg-hover-color: #0056b3;
            /* Secondary default values */
            --c4-button-secondary-bg-color: #ffffff;
            --c4-button-secondary-text-color: #007bff;
            --c4-button-secondary-border-color: #007bff;
            --c4-button-secondary-bg-hover-color: #e7f1ff;
            /*disabled state values */
            --c4-button-disabled-bg-color: #cccccc;
            --c4-button-disabled-text-color: #666666;

            /*Focus ring */
            --c4-button-focus-ring-color: #0056b3;
            /* Default theme values */
            --c4-button-font-size: 16px;
            --c4-button-padding: 12px 24px;
            --c4-button-border-radius: 8px;
            --c4-button-border: 2px solid transparent;
        }

        .button {
            font-family: inherit;
            font-size: var(--c4-button-font-size);
            padding: var(--c4-button-padding);
            border-radius: var(--c4-button-border-radius);
            border: var(--c4-button-border);
            cursor: pointer;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
            font-weight: 600;
        }

        .button--primary {
            background-color: var(--c4-button-primary-bg-color, #007bff);
            color: var(--c4-button-primary-text-color, #ffffff);
        }

        .button--primary:hover:not(:disabled) {
            background-color: var(--c4-button-primary-bg-hover-color, #0056b3);
        }


        /* Secondary Variant */

        .button--secondary {
            background-color: var(--c4-button-secondary-bg-color, #ffffff);
            color: var(--c4-button-secondary-text-color, #007bff);
            border: 2px solid var(--c4-button-secondary-border-color, #007bff);
        }

        .button--secondary:hover:not(:disabled) {
            background-color: var(--c4-button-secondary-bg-hover-color, #e7f1ff);
        }

        /* Disabled State */

        .button:disabled {
            background-color: var(--c4-button-disabled-bg-color, #cccccc);
            color: var(--c4-button-disabled-text-color, #666666);
            border-color: var(--c4-button-disabled-bg-color, #cccccc);
            cursor: not-allowed;
        }


        /* Accessibility: Focus Ring */

        .button:focus-visible {
            outline: 2px solid var(--c4-button-focus-ring-color, #0056b3);
            outline-offset: 2px;
        }
    `;


    render() {
        const buttonClasses = {
            button: true,
            'button--primary': this.variant === 'primary',
            'button--secondary': this.variant === 'secondary',
        }

        return html`
            <button class=${classMap(buttonClasses)} ?disabled=${this.disabled}>
                <slot></slot>
            </button>
        `;
    }


}