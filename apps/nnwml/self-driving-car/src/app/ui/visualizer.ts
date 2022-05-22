import { Level, NeuralNetwork } from '../logic';
import { lerp } from '../utils';

export class Visualizer {
  static drawNetwork(ctx: CanvasRenderingContext2D, network: NeuralNetwork) {
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = ctx.canvas.width - margin * 2;
    const height = ctx.canvas.height - margin * 2;

    Visualizer.drawLevel(ctx, network.levels[0], left, top, width, height);
  }

  // static draw method
  static drawLevel(ctx, level: Level, left, top, width, height) {
    const right = left + width;
    const bottom = top + height;

    const { inputs, outputs, weights } = level;

    // connects the nodes
    for (let i = 0; i < inputs.length; i += 1) {
      for (let j = 0; j < outputs.length; j += 1) {
        ctx.beginPath();
        ctx.moveTo(Visualizer.getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualizer.getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 2;
        const value: number = weights[i][j]; // yellow for +ve and blue for -ve values -> values close to 0 are almost transparant. we care when selecting colors and not if value is -ve or +ve
        const alpha: number = Math.abs(value); // alpha takes +ve units, weights are -1<0<1
        const R: number = ((value < 0) as boolean) ? 0 : 255;
        const G: number = R; // Red and Green make Yellow
        const B: number = ((value > 0) as boolean) ? 0 : 255;
        // color depending on weight
        ctx.strokeStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + alpha + ')';
        ctx.stroke();
      }
    }

    const nodeRadius = 18;

    for (let i = 0; i < inputs.length; i += 1) {
      const x = Visualizer.getNodeX(inputs, i, left, right);

      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }

    for (let i = 0; i < outputs.length; i += 1) {
      const x = Visualizer.getNodeX(outputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  }

  private static getNodeX(nodes, index: number, left, right): number {
    return lerp(
      left,
      right,
      ((nodes.length === 1) as boolean)
        ? (0.5 as number)
        : ((index / (nodes.length - 1)) as number)
    ) as number;
  }
}

// ARCHIVE

/**
 * 20220522172334 - to avoid repeating the code we destructure level into {inputs, outputs, ..} // can remove level from level.inputs.length to make the code shorter
 * const nodeRadius = 18;
    for (let i = 0; i < level.inputs.length; i += 1) { 
      const x = lerp(
        left,
        right,
        level.inputs.length == 1
          ? 0.5
          : ((i / (level.inputs.length - 1)) as number)
      );

      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
 */
