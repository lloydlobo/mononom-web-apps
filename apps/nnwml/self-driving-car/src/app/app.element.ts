import './app.element.scss';
// import { save, discard } from '../main';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'Self-driving car - No libraries';
    this.innerHTML = `
    <div class="app-wrapper">
      <canvas id="carCanvas"></canvas>
      <div id="verticalButtons" class="vertical-buttons">
        <button id="btnBrainSave">💾</button>
        <button id="btnBrainDiscard">🗑️</button>
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
 * 20220523200303
 *   <script>
        const btnBrainSave: HTMLElement = document.getElementById(
          'btnBrainSave'
          ) as HTMLElement;
        const btnBrainDiscard: HTMLElement = document.getElementById(
          'btnBrainDiscard'
          ) as HTMLElement;

        btnBrainSave.addEventListener<'click'>('click', () => {
          save();
          console.log('save');
        });

      btnBrainDiscard.addEventListener<'click'>('click', () => {
        discard();
        console.log('discard');
      });
    </script>
 * 20220523190540
<div id="canvasWrapper" class="canvas__wrapper">
        <canvas id="carCanvas"></canvas>
        <canvas id="networkCanvas"></canvas>
      </div>
*/
