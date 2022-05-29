import rewire from 'rewire';
const main = rewire('../main');
const animate = main.__get__('animate');
// @ponicode
describe('animate', () => {
  test('0', () => {
    let result: any = animate();
    expect(result).toMatchSnapshot();
  });
});
