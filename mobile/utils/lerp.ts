export const lerp = (
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  x: number
) => {
  return ((y2 - y1) * (x - x1) + y1 * (x2 - x1)) / (x2 - x1);
};
