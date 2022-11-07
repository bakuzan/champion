function generateSeed(n: number): number[] {
  if (n === 0) {
    return [];
  }

  return n === 1
    ? [0]
    : generateSeed(n >> 1).reduce(
        (p: number[], c: number) => [...p, c, n - c - 1],
        []
      );
}

export default function orderBySeed<T>(list: T[]) {
  return generateSeed(list.length).map((i) => list[i]);
}
