import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'waves-generative';
    this.innerHTML = `
      <h1 style="display: none">${title}</h1>
      `;
  }
}
customElements.define('mononom-web-apps-root', AppElement);
