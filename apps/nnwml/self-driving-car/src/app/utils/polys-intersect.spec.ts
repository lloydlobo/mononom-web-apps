import { polysIntersect } from './polys-intersect';

describe('polysIntersect', () => {
  it('should return  a boolean', () => {
    expect(typeof polysIntersect([], [])).toBe('boolean');
  });

  it('should be a function', () => {
    expect(typeof polysIntersect).toBe('function');
  });

  it('should be happy with two empty arrays & return false', () => {
    expect(polysIntersect([], [])).toBe(false);
  });
});
