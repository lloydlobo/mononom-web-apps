import { NeuralNetwork } from '../logic';
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
  static drawLevel(ctx, level, left, top, width, height) {
    const right = left + width;
    const bottom = top + height;

    const { inputs, outputs } = level;
    // connects the nodes
    for (let i = 0; i < inputs.length; i += 1) {
      for (let j = 0; j < outputs.length; j += 1) {
        ctx.beginPath();
        ctx.moveTo(Visualizer.getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualizer.getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'orange';
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
