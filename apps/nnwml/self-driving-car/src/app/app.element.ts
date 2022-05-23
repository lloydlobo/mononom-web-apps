import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const title = 'Self-driving car - No libraries';
    this.innerHTML = `
    <div class="app-wrapper">
      <canvas id="carCanvas"></canvas>
      <div id="verticalButtons" class="vertical-buttons">
        <button onclick="save()" id="btnBrainSave">💾<button>
        <button onclick="discard()" id="btnBrainDiscard">🗑️<button>
      </div>
      <canvas id="networkCanvas"></canvas>
    </div>
      `;
  }
}
customElements.define('mononom-web-apps-root', AppElement);

// import './features/road';
// import './features/sensor';

/** 
 * Archive
 * 20220523190540
<div id="canvasWrapper" class="canvas__wrapper">
        <canvas id="carCanvas"></canvas>
        <canvas id="networkCanvas"></canvas>
      </div>
*/