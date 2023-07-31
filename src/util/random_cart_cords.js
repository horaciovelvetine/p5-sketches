import { randomNumBetween } from "./random_num_between"

export function randomCartCords(min, max) {
  let x = randomNumBetween(min, max);
  let y = randomNumBetween(min, max);
  let z = randomNumBetween(min, max);
  let s = Math.abs(randomNumBetween(min, max)); // S will always be positive...

  return [x, y, z, s]
}