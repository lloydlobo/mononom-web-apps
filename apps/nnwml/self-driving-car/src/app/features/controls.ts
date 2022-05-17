export default class Controls {
  forward: boolean;
  reverse: boolean;
  right: boolean;
  left: boolean;
  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    // add a private method for addKeyboardListeners to be called in constructor
    this.addKeyboardListeners();
  }
  private addKeyboardListeners() {
    // add event listeners for keydown
    document.onkeydown = (event) => {
      switch (event.key) {
        case 'ArrowLeft': {
          this.left = true;
          break;
        }
        case 'ArrowRight': {
          this.right = true;
          break;
        }
        case 'ArrowUp': {
          this.forward = true;
          break;
        }
        case 'ArrowDown': {
          this.reverse = true;
          break;
        }
      }
      console.table(this);
    };
    // add event listeners for keyup
    document.onkeyup = (event) => {
      switch (event.key) {
        case 'ArrowLeft': {
          this.left = false;
          break;
        }
        case 'ArrowRight': {
          this.right = false;
          break;
        }
        case 'ArrowUp': {
          this.forward = false;
          break;
        }
        case 'ArrowDown': {
          this.reverse = false;
          break;
        }
      }
      console.table(this);
    };
  }
}
