import { fibonacciSeries } from './fibonacci-series';

describe('fibonacciSeries', () => {
  it('should return an array of fibonacci numbers', () => {
    expect(fibonacciSeries(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it('should be able to handle a large number of terms', () => {
    const result = fibonacciSeries(100);
    expect(result.length).toEqual(100);
    expect(result[24]).toEqual(46368);
  });

  it('should not return a negative number', () => {
    const result = fibonacciSeries(10);
    expect(result).not.toContain(-1);
  });
});
