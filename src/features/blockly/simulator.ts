// Tiny grid simulator. The Blockly toolbox emits a JS string that calls
// global helpers (moveRight, moveUp, repeat, ...). We sandbox-execute that
// string with our own helpers and return the rocket's trail.
export interface Step {
  x: number;
  y: number;
}

export interface SimResult {
  trail: Step[];
  finalPos: Step;
  error?: string;
}

const MAX_STEPS = 200;

export function simulate(code: string, start: Step): SimResult {
  const trail: Step[] = [{ ...start }];
  const pos: Step = { ...start };
  let steps = 0;
  const guard = () => {
    if (++steps > MAX_STEPS) throw new Error("Too many moves — try a smaller program.");
  };

  const api = {
    moveRight: () => {
      guard();
      pos.x += 1;
      trail.push({ ...pos });
    },
    moveLeft: () => {
      guard();
      pos.x -= 1;
      trail.push({ ...pos });
    },
    moveUp: () => {
      guard();
      pos.y += 1;
      trail.push({ ...pos });
    },
    moveDown: () => {
      guard();
      pos.y -= 1;
      trail.push({ ...pos });
    },
  };

  try {
    const fn = new Function("api", `with(api){\n${code}\n}`);
    fn(api);
  } catch (err) {
    return { trail, finalPos: pos, error: (err as Error).message };
  }
  return { trail, finalPos: pos };
}
