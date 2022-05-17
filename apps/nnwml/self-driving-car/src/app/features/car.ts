import Controls from './controls';

export default class Car {
  x: number;
  y: number;
  width: number;
  height: number;
  controls: Controls;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.controls = new Controls();
  }

  // write an update method using the Controls class values and import Controls class in main.ts
  update() {
    if (this.controls.forward) {
      this.y -= 5;
    }
    if (this.controls.reverse) {
      this.y += 5;
    }
    if (this.controls.left) {
      this.x -= 5;
    }
    if (this.controls.right) {
      this.x += 5;
    }
  }

  /* now call animate() method in main.ts */

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill(); /* context fills the rectangle with the rect defined values */
  }
}

// define as custom element
// window.customElements.define('car-element', Car);
