import { SCALE_MULTIPLIER } from "../module/constants";

export function scaleNumbers(...args) {
  return args.map(cord => cord * SCALE_MULTIPLIER)
}