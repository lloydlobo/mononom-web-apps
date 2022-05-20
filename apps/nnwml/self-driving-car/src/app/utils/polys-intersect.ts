import { getIntersection } from './get-intersection';

export function polysIntersect(poly1, poly2) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if (touch) {
        return true;
      }
    }
  }
  return false;
}

// (i + 1) % poly1.length => this is the same as i + 1, but if i is the last index, it will return 0 or the first index so the last point meets the first point
