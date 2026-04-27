// Kid-friendly Blockly toolbox. Only 4 movement blocks plus repeat & if to
// keep cognitive load low.
export const TOOLBOX = {
  kind: "flyoutToolbox",
  contents: [
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
