import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const title = 'Self-driving car - No libraries';
    this.innerHTML = `
      <canvas id="carCanvas"></canvas>

      <canvas id="networkCanvas"></canvas>
      `;
  }
}
customElements.define('mononom-web-apps-root', AppElement);

// import './features/road';
// import './features/sensor';
