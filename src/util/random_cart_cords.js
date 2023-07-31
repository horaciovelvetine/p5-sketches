import { randomNumBetween } from "./random_num_between"

export function randomCartCords(min, max) {
  let x = randomNumBetween(min, max).toFixed(2)
  let y = randomNumBetween(min, max).toFixed(2)
  let z = randomNumBetween(min, max).toFixed(2)

  return [x, y, z]
}