// random colors for traffic 'DUMMY' cars
export function getRandomColor() {
  const hue = 290 + Math.random() * 260; // image the hue circle - go 290deg around it and add random * 260 (550 deg) => get all possible hues
  return 'hsl(' + hue + ', 100% ,60%)';
}
