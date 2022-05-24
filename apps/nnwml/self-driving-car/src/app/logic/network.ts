import { lerp } from '../utils';

export class NeuralNetwork {
  levels;
  constructor(neuronCounts: number[]) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i += 1) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }

  static feedForward(givenInputs, network: NeuralNetwork) {
    // calling first level to produce it's outputs
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1 as number; i < network.levels.length; i += 1) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }

  static mutate(network, amount = 1) {
    network.levels.forEach((level) => {
      for (let i = 0; i < level.biases.length; i += 1) {
        level.biases[i] = lerp(
          level.biases[i] as number,
          Math.random() * 2 - 1,
          amount
        ); // 2nd parameter return value btw -1 and 1
      }

      for (let i = 0; i < level.weights.length; i += 1) {
        for (let j = 0; j < level.weights[i].length; j += 1) {
          level.weights[i][j] = lerp(
            level.weights[i][j] as number,
            Math.random() * 2 - 1,
            amount
          ); // 2nd parameter return value btw -1 and 1
        }
      }
    }); // this is similar to randomize( but for the entire network)
  } // 1 = 100%, 10% is similar to the current network => if amount is 0 biases, wieght stayy the same, case: in-between the level mutates by the amount
}

export class Level {
  inputs: number[];
  outputs: number[];
  biases: number[];
  weights: number[][];
  constructor(inputCount: number, outputCount: number) {
    this.inputs = new Array(inputCount) as number[];
    this.outputs = new Array(outputCount) as number[];
    this.biases = new Array(outputCount) as number[]; // biases is the alue above which a neuro will fire

    this.weights = [] as number[][];
    for (let i = 0; i < inputCount; i += 1) {
      this.weights[i] = new Array(
        outputCount
      ); /* so far only a shell for connections */
    }
    // build a random brain to begin with
    Level.randomize(this);
  }

  static randomize(level) {
    for (let i = 0; i < level.inputs.length; i += 1) {
      for (let j = 0; j < level.outputs.length; j += 1) {
        level.weights[i][j] = Math.random() * 2 - 1; // value btw -1 & 1
      }
    }
    for (let i = 0; i < level.biases.length; i += 1) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  } /*  static to serialize because methods don't serialize */

  static feedForward(givenInputs: number[], level) {
    for (let i = 0; i < level.inputs.length; i += 1) {
      level.inputs[i] = givenInputs[i];
    }

    // to get the output - calculate some kind of sum btw value of inputs and weights
    // use this for managing drawing visualizer weights alpha values
    for (let i = 0; i < level.outputs.length; i += 1) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j += 1) {
        sum += level.inputs[j] * level.weights[j][i];
      }

      if (sum > level.biases[i]) {
        level.outputs[i] = 1; // turning it on
      } else {
        level.outputs[i] = 0;
      }
    }

    return level.outputs;
  }
}

/**
 * // 4 outputs, 5 inputs
 * Why weights - each neuron has a bias and every input neuron is connected to output neurons while coding (ONLY!)
 * A weight of zero means the same thing as non-connection of neurons or variation
 * -ve value - imagine a pendulumn - oscillating from -1 <- 0 -> 1  -- car needs to turn like this
 * and now front sensors when see a negative weight of the right lane when its getting close - it signals don't turn right
 * so the next option is to turn left
 *
 * inputs: value form car sensors => compute the outputs using weights and biases(random for now)
 * but in a smart brain will have structure
 *
 * STORY TIME
 * Scientists => for feedForward() they (sum + level.biases[i]) "compare with" > 0 -- they don't use binary values here
 * this is the Hyperplane Equation
 * 2D Space -> Line equation => ws + b = 0 (w = weight, s = sensor (input) and b = bias) -- oscillates between -1 0 1 and slope of line intersection
 * 3D Space -> Plane Equation => W0S0 + W1S1 + b = 0; // *for each output (imagine sensors originating at source and diverging in a v shape pattern -- fluctuating)
 * @see https://songho.ca/math/plane/plane.html (visualization)
 * for us we'll have the last levels as binary to give a yes or no answer
 *
 * layers(or levels) move from linerarly separable to non-linearly seperable ones
 * @ see tensorflow
 *
 */
