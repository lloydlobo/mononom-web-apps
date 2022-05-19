import { lerp } from './lerp';

describe('lerp', () => {
  it('should return the midpoint between two numbers', () => {
    expect(lerp(0, 1, 0.5)).toEqual(0.5);
  });

  it('should return the first number when t is 0', () => {
    expect(lerp(0, 1, 0)).toEqual(0);
  });

  it('should return the second number when t is 1', () => {
    expect(lerp(0, 1, 1)).toEqual(1);
  });

  it('should return the midpoint between two numbers 30 & 45 => 37.5', () => {
    expect(lerp(30, 45, 0.5)).toEqual(37.5);
  });
});

describe('lerp', () => {
  it('should return negative values when t is negative', () => {
    expect(lerp(-1, 1, -0.5)).toEqual(-2);
  });

  it('should return positive values when t is positive', () => {
    expect(lerp(-1, 1, 0.5)).toEqual(0);
    expect(lerp(-1, 1, 0.5)).not.toEqual(-0.5);
  });

  it('should not throw an error if there are no arguments with another method', () => {
    const mockLerp = () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      return lerp(0, 1, 0.5);
    };

    expect(() => mockLerp()).not.toThrow();
  });
});
