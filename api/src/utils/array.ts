export function flatMap<T, U>(items: T[], f: (t: T) => U[]): U[] {
  return items.reduce((prev, next) => prev.concat(f(next)), new Array<U>())
}
