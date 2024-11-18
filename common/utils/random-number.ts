export function RandomNumber(length: number): number {
  return Math.floor(Math.random() * Math.pow(10, length));
}
