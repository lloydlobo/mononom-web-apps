import './app.element.scss';
import { Car, Road, Controls } from './features';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const title = 'Self-driving car - No libraries';
    this.innerHTML = `
      <canvas id="myCanvas"></canvas>
      `;
  }
}
customElements.define('mononom-web-apps-root', AppElement);
