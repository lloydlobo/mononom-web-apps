import { lerp } from './lerp';

/**
 * Gets the intersection of a ray and a line segment. The ray is defined by a start point and a direction. The line segment is defined by two points.
 * rayOrigin => The origin of the ray. (x, y) in pixels. * rayDirection => The direction of the ray. * lineSegmentStart => The start of the line segment. * lineSegmentEnd => The end of the line segment.
 * returns => The intersection point, or null if there is no intersection.
 * @see https://youtu.be/fHOLQJo0FjQ (video on Segment intersection (Math and JavaScript code))
 * @see https://stackoverflow.com/a/565282/12077
 * @see https://stackoverflow.com/a/11908158/12077
 * @date 5/20/2022 - 3:37:56 PM
 *
 * @export
 * @param {{ x: number; y: number }} A
 * @param {{ x: number; y: number }} B
 * @param {{ y: number; x: number }} C
 * @param {{ y: number; x: number }} D
 * @returns {{ x: number; y: number, offset: number } | null}
 */
export function getIntersection(
  A: { x: number; y: number },
  B: { x: number; y: number },
  C: { y: number; x: number },
  D: { y: number; x: number }
): {
  x: number; // x: A.x + t * (B.x - A.x),
  y: number; // y: A.y + t * (B.y - A.y),
  offset: number;
} | null {
  const Ax_Bx: number = A.x - B.x;
  const Ax_Cx: number = A.x - C.x;
  const Ay_By: number = A.y - B.y;
  const Ay_Cy: number = A.y - C.y;
  const Bx_Ax: number = B.x - A.x;
  const By_Ay: number = B.y - A.y;
  const Cx_Ax: number = C.x - A.x;
  const Cy_Ay: number = C.y - A.y;
  const Dx_Cx: number = D.x - C.x;
  const Dy_Cy: number = D.y - C.y;

  const denominator: number = Bx_Ax * Dy_Cy - By_Ay * Dx_Cx;
  const numeratorT: number = Ay_Cy * Dx_Cx - Ax_Cx * Dy_Cy;
  const numeratorU: number = Ax_Bx * Cy_Ay - Ay_By * Cx_Ax;

  if (denominator !== 0) {
    const t: number = numeratorT / denominator;
    const u: number = numeratorU / denominator;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t), // x: A.x + (B.x - A.x) * t,
        y: lerp(A.y, B.y, t), // y: A.y + (B.y - A.y) * t,
        offset: t,
      };
    }
  }

  return null as null;
}

// rename this function to getClosestIntersection later
