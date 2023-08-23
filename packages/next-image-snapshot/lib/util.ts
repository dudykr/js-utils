import { promisify } from "util";
import { spawn } from "child_process";

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const spawnAsync = promisify(spawn);
