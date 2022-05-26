/**
 * Fibonacci Series
 * Fibonacci series is a sequence of numbers in which each number is the sum of the two preceding numbers.
 *
 * @export
 * @param {number} seriesCount - number of terms
 * @return {*}  {number[]}
 */
export function fibonacciSeries(seriesCount: number): number[] {
  const fibonacci: number[] = [];
  fibonacci.push(0);
  fibonacci.push(1);
  for (let i = 2; i < seriesCount; i += 1) {
    fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
  }
  return fibonacci;
}
