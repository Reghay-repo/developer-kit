import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 A flexible content container component.
 @element c4-card
 @slot - The default slot for the main body content of the card.
 @slot title - A named slot for the card's title.
 @slot image - A named slot for the card's image.
 @cssprop --c4-card-padding - The inner padding of the card.
 @cssprop --c4-card-border-radius - The border radius of the card.
 @cssprop --c4-card-box-shadow - The box shadow of the card.
 @cssprop --c4-card-border - The border of the card.
 */
@customElement('c4-card')
export class C4Card extends LitElement {
// Styles, properties, and render logic will go here

    /**
     * The URL for an optional image to display at the top of the card.
     * @type {string}
     */
    @property({type: String, attribute: 'image-url'})
    imageUrl = '';


    static styles = css`
        :host {
            display: block;
            /* Default theme values */
            --c4-card-padding: 1.5rem;
            --c4-card-border-radius: 8px;
            --c4-card-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            --c4-card-border: 1px solid #ddd;
            //--c4-card-slotted-title-color:#000;
        }

        .card {
            border: var(--c4-card-border);
            border-radius: var(--c4-card-border-radius);
            box-shadow: var(--c4-card-box-shadow);
            overflow: hidden; /* Ensures image corners are rounded */
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .card__image img {
            width: 100%;
            height: auto;
            display: block;
        }

        .card__content {
            padding: var(--c4-card-padding);
        }

        /* Styling content that is PASSED INTO the component */

        ::slotted([slot='title']) {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
           color: var(--c4-card-slotted-title-color, #333);
        }
    `;


    render() {
        return html`
            <div class="card">
                ${this.imageUrl ? html`
                            <div class="card__image">
                                <img src=${this.imageUrl} alt=""/>
                            </div>`

                        : html`
                            <slot name="image"></slot>`}

                <div class="card__content">
                    <slot name="title"></slot>
                    <slot></slot>
                </div>
            </div>
        `
    }

}