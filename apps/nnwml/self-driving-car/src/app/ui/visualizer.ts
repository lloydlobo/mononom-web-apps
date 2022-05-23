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
        ); // 1st @param => want bottom most level to start at y value that still can fit in screen

      // line dash crazy animation
      ctx.setLineDash([7, 3]); // drawn before drawing the levels as a root property

      Visualizer.drawLevel(
        ctx,
        network.levels[i],
        left,
        levelTop,
        width,
        levelHeight,
        ((i === network.levels.length - 1) as boolean)
          ? ['⇑', '⇐', '⇒', '⇓']
          : []
      );
    }
  }

  // static draw method
  static drawLevel(ctx, level: Level, left, top, width, height, outputLabels) {
    const right = left + width;
    const bottom = top + height;
    const nodeRadius = 18;
    const { inputs, outputs, weights, biases } = level; // destructuring level for ease

    // Connects the nodes -> with yellow (+ve) & blue (-ve) lines
    for (let i = 0; i < inputs.length; i += 1) {
      for (let j = 0; j < outputs.length; j += 1) {
        ctx.beginPath();
        ctx.moveTo(Visualizer.getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualizer.getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 2;
        // color depending on weight
        if (outputs[i] === 1) {
          // console.log(outputs[i]);
          ctx.strokeStyle = getRGBA(weights[i][j] * 1); // this is where you modify alpha values for more dynamic weight
        } else {
          // console.log(outputs[i]);
          ctx.strokeStyle = getRGBA(weights[i][j] * 0.5); // this is where you modify alpha values for more dynamic weight
        }
        ctx.stroke();
      }
    }

    // EXERCISE
    // use this in Animate duh :D  => // Visualizer.drawNetwork(networkCtx, car.brain); <-> pass in another parameter
    // save state and reset the state... something like that like car.update, car.restore, car.save
    // Build some kind of feedForward function that changes the stroke weight's alpha valus. cause now it's static
    // for (let i = 0; i < level.outputs.length; i += 1) {
    //   let sum = 0;
    //   for (let j = 0; j < level.inputs.length; j += 1) {
    //     sum += level.inputs[j] * weights[j][i];
    //     if (sum > biases[i]) {
    //       // level.outputs[i] = 1; // this is the output neuron arc node
    //       ctx.strokeStyle = getRGBA(weights[i][j]); // this is where you modify alpha values for more dynamic weight
    //     } else {
    //       // level.outputs[i] = 0;
    //       ctx.strokeStyle = getRGBA(weights[i][j]); // this is where you modify alpha values for more dynamic weight
    //     }
    //   }
    // }

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
      ctx.arc(x, top, (nodeRadius * 60) / 100, 0, Math.PI * 2); // node < 40% to see biases
      ctx.fillStyle = getRGBA(outputs[i]);
      ctx.fill();
      // draw biases as a contour around the output nodes
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(x, top, (nodeRadius * 80) / 100, 0, Math.PI * 2); // 80% of radius
      ctx.strokeStyle = getRGBA(biases[i]);
      ctx.setLineDash([3, 3]); // biases are perforated 3px of line, 3px of space
      ctx.stroke();
      ctx.setLineDash([]); // reset it
      //outputLabels nodes symbols
      if (outputLabels[i] as boolean) {
        ctx.beginPath();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'orange';
        ctx.strokeStyle = 'red';
        const fontSizeScale = 1.2;
        ctx.font = (nodeRadius * fontSizeScale + 'px Arial') as string;
        ctx.fillText(outputLabels[i], x, top + nodeRadius * -0); // nodeRadius * 0.1 aligns the symbol fill
        ctx.lineWidth = 1.2;
        ctx.strokeText(outputLabels[i], x, top);
      }
    }
  }

  private static getNodeX(nodes, index: number, left, right): number {
    return lerp(
      left,
      right,
      ((nodes.length == 1) as boolean)
        ? (0.5 as number)
        : ((index / (nodes.length - 1)) as number)
    ) as number;
  }
}

// ARCHIVE

/**
 * 20220523162408
 * console.table(
          [
            {
              i: i,
              j: j,
              sum: sum,
              biases: biases[i],
              inputs: inputs[j],
              weights: weights[j][i],
              outputs: outputs[i],
              sum_biases: sum > biases[i]
            }
          ]
        );
 * 20220523154813
 * // weights line connections -> fade in and out -> depending on input neurons value
 * for (let i = 0; i < level.outputs.length; i += 1) {
      let sum = 0;
      console.table({ sum });
      for (let j = 0; j < level.inputs.length; j += 1) {
        sum += level.inputs[j] * weights[j][i];
        console.table({ sum });

        if (sum > biases[i]) {
          level.outputs[i] = 1;
        } else {
          level.outputs[i] = 0;
        }
      }
    }
 * 20220523105307
 * https://en.wikipedia.org/wiki/Arrows_(Unicode_block)
 * //   //  ⭠ ⭢ ⭡ ⭣ ; ◀ ▶ ▲ ▼ http://xahlee.info/comp/unicode_arrows.html
 * // '↑', '←', '→', '↓' symbols from https://unicode.org/charts/nameslist/n_2190.html
 * 
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
