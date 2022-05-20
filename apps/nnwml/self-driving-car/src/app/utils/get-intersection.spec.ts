import { getIntersection } from './get-intersection';

describe('getIntersection', () => {
  it('should be defined', () => {
    expect(getIntersection).toBeDefined();
  });

  it('should return null when no intersection', () => {
    // four arguments for getIntersection()
    const A = { x: 0, y: 0 };
    const B = { x: 10, y: 0 };
    const C = { x: 0, y: 10 };
    const D = { x: 10, y: 10 };
    expect(getIntersection(A, B, C, D)).toBeNull();
  });

  it('should return the intersection point when there is an intersection', () => {
    // four arguments for getIntersection()
    const A = { x: 0, y: 0 };
    const B = { x: 10, y: 0 };
    const C = { x: 0, y: 10 };
    const D = { x: 10, y: 0 };
    const E = { x: 10, y: 0, offset: 1 };
    expect(getIntersection(A, B, C, D)).toEqual(E);
  });

  it('should work with a (...spread) operator', () => {
    const intersection = { x: 10, y: 0, offset: 1 };
    const arrays = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 0, y: 10 },
      { x: 10, y: 0 },
    ];
    const array = [...arrays];
    const A = array[0];
    const B = array[1];
    const C = array[2];
    const D = array[3];
    expect(getIntersection(A, B, C, D)).toEqual(intersection);
  });
});
