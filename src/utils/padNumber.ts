export default function padNumber(
  n: number | string,
  width: number,
  z = '0'
): string {
  n = n.toString();
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
