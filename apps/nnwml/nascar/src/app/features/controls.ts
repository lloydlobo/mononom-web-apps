export class Controls {
  forward: boolean;
  left: boolean;
  right: boolean;
  reverse: boolean;
  constructor() {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    this.addKeyboardEventListeners();
  }

  private addKeyboardEventListeners() {
    document.onkeydown = (event) => {
      switch (event.key) {
        case 'ArrowUp': {
          this.forward = true;
          break;
        }
        case 'ArrowLeft': {
          this.left = true;
          break;
        }
        case 'ArrowRight': {
          this.right = true;
          break;
        }
        case 'ArrowDown': {
          this.reverse = true;
          break;
        }
      }
      console.table(this);

      document.onkeyup = (event) => {
        switch (event.key) {
          case 'ArrowUp': {
            this.forward = false;
            break;
          }
          case 'ArrowLeft': {
            this.left = false;
            break;
          }
          case 'ArrowRight': {
            this.right = false;
            break;
          }
          case 'ArrowDown': {
            this.reverse = false;
          }
        }
        console.table(this);
      }; // arrow => allows this to access the Controls class
    };
  }
}
