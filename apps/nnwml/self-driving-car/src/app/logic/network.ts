/* eslint-disable @typescript-eslint/no-explicit-any */
export class NeuralNetwork {
  levels: any[];
  constructor(neuronCounts) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i += 1) {
      this.levels.push(
        new Level(neuronCounts[i], neuronCounts[i + 1])
      );
    }

  }

  static feedForward(givenInputs, network) {
    // calling first level to produce it's outputs
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1 as number; i < network.levels.length; i += 1) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }

}

export class Level {
  inputs: any[];
  outputs: any[];
  biases: any[];
  weights: any[];
  constructor(inputCount: number, outputCount: any) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount); // biases is the alue above which a neuro will fire

    this.weights = [];
    for (let i = 0; i < inputCount; i += 1) {
      this.weights[i] = new Array(outputCount); /* so far only a shell for connections */

      // build a random brain to begin with
      Level.randomize(this);
    }
  }

  static randomize(level) {
    // throw new Error("Method not implemented.");
    for (let i = 0; i < level.inputs.length; i += 1) {
      for (let j = 0; j < level.outputs.length; j += 1) {
        level.weight[i][j] = Math.random() * 2 - 1; // value btw -1 & 1
      }
    }

    for (let i = 0; i < level.biases.length; i += 1) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  } /*  static to serialize because methods don't serialize */

  static feedForward(givenInputs, level) {
    for (let i = 0; i < level.inputs.length; i += 1) {
      level.inputs[i] = givenInputs[i];

    }
    // to get the output - calculate some kind of sum btw value of inputs and weights
    for (let i = 0; i < level.outputs.length; i += 1) {
      let sum = 0;
      // const inputs = this.inputs
      for (let j = 0; j < level.inputs.length; j += 1) {
        sum += level.inputs[j] * level.weights[j];
      }

      if (sum > level.biases[i]) {
        level.output[i] = 1; // turning it on
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