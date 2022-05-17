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
      }
    };
  }
}
