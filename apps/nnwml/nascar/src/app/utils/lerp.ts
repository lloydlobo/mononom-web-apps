/**
 * Linear Interpolation or lerp
 * lerp is a method of interpolating a value between two other values.
 * It is used to calculate the position of an object in a linear fashion.
 *
 * @param {number} A - start value
 * @param {number} B - end value
 * @param {number} t - interpolation value
 * @returns {number} - interpolated value
 * @example lerp(0, 100, 0.5); // 50
 * @example lerp(0, 100, 0.0); // 0
 * @example lerp(0, 100, -0.5); // -50
 * @example lerp(11, 45, 0.7) // 34.8
 * @example lerp(0, 100, 1.0); // 100
 * @example lerp(0, 100, -0.5); // 0
 * @example lerp(Number('0'), Number('100'), 0.5); // 50
 *
 */
export function lerp(A: number, B: number, t: number): number {
  return (A + (B - A) * t) as number;
}
