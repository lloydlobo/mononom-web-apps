import { Level, NeuralNetwork } from '../logic';
import { getRGBA, lerp } from '../utils';

export class Visualizer {
  static drawNetwork(ctx: CanvasRenderingContext2D, network: NeuralNetwork) {
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = ctx.canvas.width - margin * 2;
    const height = ctx.canvas.height - margin * 2;

    // Visualizer.drawLevel(ctx, network.levels[0], left, top, width, height); // adding new level visuals so diasbled this
    const levelHeight = height / network.levels.length;

    // allows the loop to iterate from the last i in the array
    for (let i = network.levels.length - 1; i >= 0; i--) {
      const levelTop =
        top +
        lerp(
          height - levelHeight,
          0,
          ((network.levels.length === 1) as boolean)
            ? 0.5
            : i / (network.levels.length - 1)
        ); // 1st @param => want bottommost level to start at y value that still can fit in screen

      Visualizer.drawLevel(
        ctx,
        network.levels[1],
        left,
        levelTop,
        width,
        levelHeight
      );
    }
  }

  // static draw method
  static drawLevel(ctx, level: Level, left, top, width, height) {
    const right = left + width;
    const bottom = top + height;

    const { inputs, outputs, weights, biases } = level; // destructuring level for ease

    const lineWidthBias = 2;
    // connects the nodes with yellow (+ve) & blue (-ve) lines
    for (let i = 0; i < inputs.length; i += 1) {
      for (let j = 0; j < outputs.length; j += 1) {
        ctx.beginPath();
        ctx.moveTo(Visualizer.getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualizer.getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 2;
        // color depending on weight
        ctx.strokeStyle = getRGBA(weights[i][j]);
        ctx.stroke();
      }
    }

    const nodeRadius = 18;
    // Input Nodes
    for (let i = 0; i < inputs.length; i += 1) {
      const x = Visualizer.getNodeX(inputs, i, left, right);
      // visual trick black nodes to overlap connections visually
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2); // full node radius
      ctx.fillStyle = 'black';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, bottom, (nodeRadius * 60) / 100, 0, Math.PI * 2);
      ctx.fillStyle = getRGBA(inputs[i]);
      ctx.fill();
    }
    // Output nodes
    for (let i = 0; i < outputs.length; i += 1) {
      const x = Visualizer.getNodeX(outputs, i, left, right);
      // visual trick black nodes to overlap connections visually
      ctx.beginPath();
      ctx.arc(x, top, nodeRadius, 0, Math.PI * 2); // full node radius
      ctx.fillStyle = 'black';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, top, (nodeRadius * 60) / 100, 0, Math.PI * 2); // makes node 40% small to see biases
      ctx.fillStyle = getRGBA(outputs[i]);
      ctx.fill();

      // draw biases as a contour around the output nodes
      ctx.beginPath();
      ctx.lineWidth = lineWidthBias;
      ctx.arc(x, top, (nodeRadius * 80) / 100, 0, Math.PI * 2); // 80% of radius
      ctx.strokeStyle = getRGBA(biases[i]);
      ctx.setLineDash([3, 3]); // biases are perforated 3px of line, 3px of space
      ctx.stroke();
      ctx.setLineDash([]); // reset it
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
 * 20220523101306
 * Drawing the second level has some problems:
 * 1. we are drawing the levels bottoms up 
 *    for (let i = 0; i < network.levels.length; i += 1) {
 * 2. the biases are overdrawn by the intermediate level which draws it's input
 *    value over the previous level's biases.
 * 3. So reverse the for loop starting point. start from the last i of the array
 *    for (let i = network.levels.length - 1; i >= 0; i--) { // allows the loop to iterate from the last i in the array
 * 
 * 20220523100102
 * export class Visualizer {
 * ....
 * Visualizer.drawLevel(ctx, network.levels[0], left, top, width, height);
 * }
 * 
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
