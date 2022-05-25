import { lerp } from '../utils/';

export class Road {
  left: number;
  right: number;
  top: number;
  bottom: number;
  constructor(public x: number, public width: number, public laneCount = 6) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;
    // this.lanes = [];
    // for (let i = 0; i < this.laneCount; i++) {
    //   this.lanes.push(new Lane(this.x, this.y, this.width, i));
    // }

    this.left = x - width / 2;
    this.right = x + width / 2;
  }

  /**
   * Returns the x coordinate of the center of the road
   * @param laneIndex Get the x coordinate of the center of the lane
   * @param laneWidth Get the width of the lane
   * @returns
   */
  getLaneCenter(laneIndex: number) {
    // return lerp(this.left, this.right, laneIndex / this.laneCount); // copilot
    const laneWidth = this.width / (this.laneCount * 2);
    return lerp(
      this.width - laneWidth / 2,
      this.width / 2 - laneWidth / 2,
      laneIndex / this.laneCount
    ); // copilot
    // const laneWidth = this.width / this.laneCount;
    // return this.left + laneWidth / 2 + laneIndex * laneWidth; // change this.left to this.right for reverse order
  }

  draw(ctx) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff';

    for (let i = 0; i <= this.laneCount; i += 1) {
      // what is the x coordinate of each of the lines/arcs? Use linear interpolation
      const x = lerp(this.left, this.right, i / this.laneCount);
      // const y = lerp(this.right, this.left, i / this.laneCount);
      if (i > 3 && i < this.laneCount) {
        ctx.setLineDash([20, 20]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.lineWidth = 0;
      ctx.arc(this.width / 2, this.right / 2, x / 2, 0, Math.PI * 2);

      ctx.stroke();
    }
  }
}

/**
 * ARCHIVE
 *
 * @202205251541
 * ctx.arc(
  (this.left + this.right) / 2,
  330,
  this.width / 2,
  0,
  Math.PI * 2
);
 *
*/
