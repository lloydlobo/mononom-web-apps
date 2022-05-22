export function getRGBA(value) {
  const alpha: number = Math.abs(value); // alpha takes +ve units, weights are -1<0<1
  const R: number = ((value < 0) as boolean) ? 0 : 255; // +ve connections
  const G: number = R; // Red and Green make Yellow
  const B: number = ((value > 0) as boolean) ? 0 : 255; // -ve connections
  // color depending on weight
  return 'rgba(' + R + ',' + G + ',' + B + ',' + alpha + ')';
}

// yellow for +ve and blue for -ve values -> values close to 0 are almost transparant. we care when selecting colors and not if value is -ve or +ve
