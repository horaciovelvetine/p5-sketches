export function findDistanceBetween(node1, node2) {
  let xDist = Math.abs(node1.x - node2.x);
  let yDist = Math.abs(node1.y - node2.y);
  let zDist = Math.abs(node1.z - node2.z);
  return Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);
}