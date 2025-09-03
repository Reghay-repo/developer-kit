


export const getComponentTemplate = (className: string, tagName: string, aiDocs: string = '') => `
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

${aiDocs ? `\n${aiDocs}` : ''}
@customElement('${tagName}')
export class ${className} extends LitElement {
  static styles = css\`
    :host {
      display: block;
    }
  \`;

  render() {
    return html\`
      <div>Hello from ${className}!</div>
    \`;
  }
}
`;