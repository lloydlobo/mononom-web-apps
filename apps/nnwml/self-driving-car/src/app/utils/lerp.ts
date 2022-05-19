/**
 * Linear Interpolation between two values A and B based on the percentage t
 * when t = 0, return A
 * when t = 1, return B
 * when t = 0.5, return the midpoint between A and B
 * @date 5/19/2022 - 1:00:32 PM
 *
 * @export
 * @param {number} A
 * @param {number} B
 * @param {number} t
 * @returns {number}
 */
export function lerp(A: number, B: number, t: number): number {
  return (A + (B - A) * t) as number;
}
