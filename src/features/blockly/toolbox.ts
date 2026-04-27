// Kid-friendly Blockly toolbox. Only 4 movement blocks plus repeat & if to
// keep cognitive load low. The on_start hat block is listed first so kids
// can see it in the flyout even though one is pre-placed in the workspace.
export const TOOLBOX = {
  kind: "flyoutToolbox",
  contents: [
    { kind: "block", type: "on_start" },
    { kind: "block", type: "move_right" },
    { kind: "block", type: "move_up" },
    { kind: "block", type: "move_left" },
    { kind: "block", type: "move_down" },
    {
      kind: "block",
      type: "controls_repeat_ext",
      inputs: {
        TIMES: { shadow: { type: "math_number", fields: { NUM: 2 } } },
      },
    },
    { kind: "block", type: "controls_if" },
    { kind: "block", type: "math_number", fields: { NUM: 1 } },
    { kind: "block", type: "logic_compare" },
  ],
};
