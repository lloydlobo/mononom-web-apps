import { lerp } from './lerp';

describe('lerp', () => {
  it('should exist', () => {
    expect(lerp).toBeDefined();
  });

  it('should return the correct value', () => {
    expect(lerp(0, 100, 0.5)).toEqual(50);
    expect(lerp(0, 100, 0.0)).toEqual(0);
    expect(lerp(0, 100, 1.0)).toEqual(100);
    expect(lerp(11, 45, 0.7)).toEqual(34.8);
    expect(lerp(0, 100, -0.5)).toEqual(-50);
  });

  it('should return a value when the first argument is a string in a Number method', () => {
    expect(lerp(Number('0'), Number('100'), 0.5)).toEqual(50);
    // expect(() => lerp(Number('a'), 100, 0.5)).toThrow();
  });

  it('should return a NaN when the first argument is a string in a Number method', () => {
    expect(lerp(Number('a'), 100, 0.5)).toEqual(NaN);
    expect(lerp(Number('a'), 100, 0.5)).toBeNaN;
  });
});

describe('lerp', () => {
  it('should return 50', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });

  it('should return 0', () => {
    expect(lerp(0, 100, 0.0)).toBe(0);
  });

  it('should return 100', () => {
    expect(lerp(0, 100, 1.0)).toBe(100);
  });

  it('should return 34.8', () => {
    expect(lerp(11, 45, 0.7)).toBe(34.8);
  });

  it('should return -50', () => {
    expect(lerp(0, 100, -0.5)).toBe(-50);
  });
});
