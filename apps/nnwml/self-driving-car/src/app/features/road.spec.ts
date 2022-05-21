/*
██████╗  ██████╗  █████╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗██╔══██╗
██████╔╝██║   ██║███████║██║  ██║
██╔══██╗██║   ██║██╔══██║██║  ██║
██║  ██║╚██████╔╝██║  ██║██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝

 */

// import { road } from './../../main'


// describe('road', () => {
//   it('should be defined', () => {
//     expect(road).toBeNull();
//   })
// })


/**
 *
 * 20220521141901

   TypeError: Cannot set properties of null (setting 'width')

       6 |
       7 | export const canvas = document.getElementById('myCanvas') as HTMLCanvasElement; // object
    >  8 | canvas.width = 200;
         | ^
       9 | export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D; // a drawing context is a way to draw on a canvas
      10 |
      11 | export const road = new Road(canvas.width / 2, canvas.width * 0.9);

      at Object.<anonymous> (src/main.ts:8:1)
      at Object.<anonymous> (src/app/features/road.spec.ts:11:1)
      at TestScheduler.scheduleTests (../../../node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (../../../node_modules/@jest/core/build/runJest.js:404:19)

*/

// ============================================================================

/*
ARCHIVE
 */


// import { canvas } from './../../main';
// import { Road } from './road';
// import { ctx } from './../../main';

// jest.mock('../../main', () => ({
//   canvas: {
//     width: 200,
//     height: 2000000,
//   },
//   ctx: {
//     fillRect: jest.fn(),
//     clearRect: jest.fn(),
//   },
// }));

// let road: Road;
// let laneCount: number;
// let laneWidth: number;

// beforeEach(() => {
//   road = new Road(canvas.width / 2, canvas.width);
//   return { canvas, road, ctx };
// });


// describe('Road', () => {
//   it('should create an instance', () => {
//     expect(new Road(canvas.width / 2, canvas.width)).toBeTruthy();
//   });

//   it('should have a width', () => expect(road.width).toBe(canvas.width));
// });

/*
██████╗  ██████╗  █████╗ ██████╗     ██████╗ ██████╗  █████╗ ██╗    ██╗     ██████╗████████╗██╗  ██╗
██╔══██╗██╔═══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗██║    ██║    ██╔════╝╚══██╔══╝╚██╗██╔╝
██████╔╝██║   ██║███████║██║  ██║    ██║  ██║██████╔╝███████║██║ █╗ ██║    ██║        ██║    ╚███╔╝
██╔══██╗██║   ██║██╔══██║██║  ██║    ██║  ██║██╔══██╗██╔══██║██║███╗██║    ██║        ██║    ██╔██╗
██║  ██║╚██████╔╝██║  ██║██████╔╝    ██████╔╝██║  ██║██║  ██║╚███╔███╔╝    ╚██████╗   ██║   ██╔╝ ██╗
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝      ╚═════╝   ╚═╝   ╚═╝  ╚═╝

 */
// describe('road.draw(ctx)', () => {
//   it('should be truthy', () => expect(road.draw).toBeTruthy());

//   it('should be a function', () => expect(typeof road.draw).toBe('function'));

//   it('road.draw(ctx) throws an error "ctx.setLineDash is not a function"', () => {
//     expect(() => road.draw(ctx)).toThrow('ctx.setLineDash is not a function');
//   });
//   /* why does it throw error "ctx.setLineDash is not a function" */
// });

/*
██╗      █████╗ ███╗   ██╗███████╗     ██████╗███████╗███╗   ██╗████████╗███████╗██████╗
██║     ██╔══██╗████╗  ██║██╔════╝    ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
██║     ███████║██╔██╗ ██║█████╗      ██║     █████╗  ██╔██╗ ██║   ██║   █████╗  ██████╔╝
██║     ██╔══██║██║╚██╗██║██╔══╝      ██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
███████╗██║  ██║██║ ╚████║███████╗    ╚██████╗███████╗██║ ╚████║   ██║   ███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝     ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝

*/
// describe('Road.getLaneCenter', () => {
//   // get laneCount from road
//   beforeEach(() => {
//     laneCount = 3;
//     laneWidth = road.width / laneCount;
//     return { laneCount, laneWidth };
//   });

  // it('should return the center of a lane', () =>
  //   expect(road.getLaneCenter(1)).toBe(canvas.width / 2));

  // it('should be greater than canvas.width/2 and less than canvas.width', () => {
  //   expect(road.getLaneCenter(2)).toBeGreaterThan(canvas.width / 2);
  //   expect(road.getLaneCenter(2)).toBeLessThan(canvas.width);
  // });

  // mock getLaneIndex here jest
//   it('should not throw an error if lane is out of bounds', () => {
//     expect(() => road.getLaneCenter(laneCount + 1)).not.toThrow();
//     expect(() => road.getLaneCenter(3)).not.toThrow();
//     expect(() => road.getLaneCenter(40)).not.toThrow();
//   });

//   it('should match the getLaneCenter mock statement where index = 0', () => {
//     expect(road.getLaneCenter(0)).toBe(
//       road.left +
//       laneWidth / 2 +
//       ((Math.min(0, laneCount) * laneWidth) as number)
//     );
//   });

//   it('should match the getLaneCenter mock statement where index = 1', () =>
//     expect(road.getLaneCenter(1)).toBe(
//       road.left +
//       laneWidth / 2 +
//       ((Math.min(1, laneCount) * laneWidth) as number)
//     ));

//   it.todo('negative lane numbers should return the center of lane 1');
//   // () => {
//   //   expect(road.getLaneCenter(-1)).toBe(canvas.width / 2);
//   // });

//   it('should be a number', () =>
//     expect(typeof road.getLaneCenter(0)).toBe('number'));
// });
