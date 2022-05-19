export class Road {
  x: number;
  width: number;
  laneCount: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  constructor(x: number, width: number, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x - width / 2;

    // want the road to go infinitely downwards
    const infinity = 1000000; // using JS infinity may cause problems when drawing
    this.top = -infinity as number;
    this.bottom = infinity as number;
  }
}
