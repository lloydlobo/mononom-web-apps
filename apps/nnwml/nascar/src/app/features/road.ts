import { lerp } from '../utils/';

export class Road {
  left: number;
  right: number;
  borders: { x: number; y: number; radius: number }[];
  scaleRoad: number;
  constructor(
    public x: number,
    public width: number,
    public laneCount = 6,
    scaleRoad = 0.9
  ) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    this.scaleRoad = scaleRoad;

    // this.lanes = [];
    // for (let i = 0; i < this.laneCount; i++) {
    //   this.lanes.push(new Lane(this.x, this.y, this.width, i));
    // }

    this.left = x - width / 2;
    this.right = x + width / 2;

    // draw border for circular lanes where the car can go in circle, this.borders is an array of objects
    this.borders = [
      {
        x: this.left,
        y: this.right,
        radius: ((this.right - this.left) * this.scaleRoad) / 2,
      },
    ];
  }

  /**
   * Returns the x coordinate of the center of the road
   * @param laneIndex Get the x coordinate of the center of the lane
   * laneWidth Get the width of the lane
   * @returns
   */
  getLaneCenter(laneIndex: number) {
    // return lerp(this.left, this.right, laneIndex / this.laneCount); // copilot
    const laneWidth = this.width / (this.laneCount * 2);
    return lerp(
      this.width - laneWidth / 2,
      this.width / 2 - laneWidth / 2,
      Math.min(laneIndex, this.laneCount - 1) / this.laneCount
    ); // copilot
    // const laneWidth = this.width / this.laneCount;
    // return this.left + laneWidth / 2 + laneIndex * laneWidth; // change this.left to this.right for reverse order
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff';
    for (let i = 1; i <= this.laneCount - 1; i += 1) {
      const x = lerp(this.left, this.right, i / this.laneCount);
      // what is the x coordinate of each of the lines/arcs? Use linear interpolation
      if (i > 3 && i < this.laneCount) {
        ctx.setLineDash([20, 20]);
      } else {
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.arc(
        this.width / 2,
        this.right / 2,
        (x * this.scaleRoad) / 2,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      this.borders.push({
        x: this.width,
        y: this.right,
        radius: (x * this.scaleRoad) / 2,
      });
    }

    for (let i = 0; i < this.laneCount; i++) {
      ctx.beginPath();
      this.borders[i].x = this.width / 2;
      this.borders[i].y = this.right / 2;
      ctx.strokeStyle = '#ff00ff20';
      ctx.arc(
        this.borders[i].x,
        this.borders[i].y,
        this.borders[i].radius,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  }
}

/**
 * ARCHIVE
 *
 * @202205251845
 *  ctx.lineWidth = 4;
    ctx.strokeStyle = 'red';
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.arc(this.width / 2, this.right / 2, border.radius, 0, Math.PI * 2);
      ctx.stroke();
    });
    // instead do it for borders[0] and borders[laneCount] -> forEach won't work but it can if it's for sensors!!!
    // ctx.setLineDash([]);
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = 'red';
    // this.borders.forEach((border) => {
    //   ctx.beginPath();
    //   ctx.arc(this.width / 2, this.right / 2, border.radius, 0, Math.PI * 2);
    //   ctx.stroke();
    // });
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
