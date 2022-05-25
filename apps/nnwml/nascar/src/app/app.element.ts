import './app.element.css';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'Self Driving Nascar';
    this.innerHTML = `
    <div class="wrapper">
      <div class="container">
        <!--  WELCOME  -->
        <div id="welcome">
          <h1>
            ${title}
          </h1>
        </div>

        <!--  COMMANDS  -->
        <!-- <h2>Canvas</h2> -->
        <div class="wrapper">
        <canvas id="canvas" class="rounded shadow canvas"></canvas>
        </div>
        </div>

        <!--  FOOTER  -->
        <p id="love">
          Carefully crafted with
          <svg
            fill="currentColor"
            stroke="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
              </svg>
              </p>
    </div>
      `;
  }
}
customElements.define('mononom-web-apps-root', AppElement);
