import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    // const title = 'Sine Waves';
    this.innerHTML = `
        <!--  CANVAS  -->
        <canvas id="canvas"></canvas>
      `;
  }
}
customElements.define('mononom-web-apps-root', AppElement);
