import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { i as inject, u as utils, X as Xml, s as svgResize, B as Blocks, j as javascriptGenerator } from "../_libs/blockly.mjs";
import "../_libs/jsdom.mjs";
import "path";
import "fs";
import "vm";
import "events";
import "os";
import "child_process";
import "zlib";
import "../_libs/tough-cookie.mjs";
import "../_libs/tldts.mjs";
import "../_libs/tldts-core.mjs";
import "../_libs/html-encoding-sniffer.mjs";
import "../_libs/whatwg-encoding.mjs";
import "../_libs/iconv-lite.mjs";
import "string_decoder";
import "../_libs/safer-buffer.mjs";
import "buffer";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "../_libs/tr46.mjs";
import "../_libs/punycode.mjs";
import "../_libs/whatwg-mimetype.mjs";
import "../_libs/cssstyle.mjs";
import "../_libs/rrweb-cssom.mjs";
import "../_libs/asamuzakjp__css-color.mjs";
import "../_libs/csstools__css-calc.mjs";
import "../_libs/@csstools/css-parser-algorithms+[...].mjs";
import "../_libs/csstools__css-tokenizer.mjs";
import "../_libs/lru-cache.mjs";
import "../_libs/csstools__css-color-parser.mjs";
import "../_libs/csstools__color-helpers.mjs";
import "util";
import "../_libs/symbol-tree.mjs";
import "../_libs/is-potential-custom-element-name+[...].mjs";
import "../_libs/xml-name-validator.mjs";
import "../_libs/nwsapi.mjs";
import "../_libs/saxes.mjs";
import "../_libs/xmlchars.mjs";
import "../_libs/parse5.mjs";
import "../_libs/entities.mjs";
import "../_libs/w3c-xmlserializer.mjs";
import "../_libs/decimal.js.mjs";
import "crypto";
import "http";
import "../_libs/data-urls.mjs";
import "https";
import "../_libs/http-proxy-agent.mjs";
import "tls";
import "url";
import "net";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "../_libs/https-proxy-agent.mjs";
import "assert";
import "stream";
import "../_libs/ws.mjs";
const TOOLBOX = {
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
        TIMES: { shadow: { type: "math_number", fields: { NUM: 2 } } }
      }
    },
    { kind: "block", type: "controls_if" },
    { kind: "block", type: "math_number", fields: { NUM: 1 } },
    { kind: "block", type: "logic_compare" }
  ]
};
const DEFAULT_WORKSPACE_XML = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="on_start" x="20" y="20" deletable="false" movable="true"></block>
</xml>`.trim();
let blocksRegistered = false;
function registerBlocks() {
  if (blocksRegistered) return;
  blocksRegistered = true;
  Blocks["on_start"] = {
    init() {
      this.appendDummyInput().appendField("✦ When Run is pressed");
      this.setNextStatement(true, null);
      this.setColour("#22c55e");
      this.setTooltip("Blocks connected here will run when you press the Run button.");
      this.setHelpUrl("");
    }
  };
  javascriptGenerator.forBlock["on_start"] = () => "";
  const moves = [
    ["move_right", "Move ▶", "#3b82f6", () => "moveRight();\n"],
    ["move_up", "Move ▲", "#10b981", () => "moveUp();\n"],
    ["move_left", "Move ◀", "#6366f1", () => "moveLeft();\n"],
    ["move_down", "Move ▼", "#f59e0b", () => "moveDown();\n"]
  ];
  for (const [name, label, color, gen] of moves) {
    Blocks[name] = {
      init() {
        this.appendDummyInput().appendField(label);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(color);
      }
    };
    javascriptGenerator.forBlock[name] = gen;
  }
}
function BlocklyWorkspace({ onCodeChange, initialXml }) {
  const containerRef = reactExports.useRef(null);
  const wsRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!containerRef.current) return;
    registerBlocks();
    const ws = inject(containerRef.current, {
      toolbox: TOOLBOX,
      trashcan: true,
      scrollbars: true,
      grid: { spacing: 20, length: 3, colour: "#dbeafe", snap: true },
      zoom: { controls: true, wheel: false, startScale: 1 },
      renderer: "zelos"
    });
    wsRef.current = ws;
    const xml = initialXml ?? DEFAULT_WORKSPACE_XML;
    try {
      const dom = utils.xml.textToDom(xml);
      Xml.domToWorkspace(dom, ws);
    } catch {
    }
    const emit = () => {
      const code = javascriptGenerator.workspaceToCode(ws);
      onCodeChange?.(code);
    };
    ws.addChangeListener(emit);
    emit();
    const ro = new ResizeObserver(() => svgResize(ws));
    ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
      ws.dispose();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full min-h-[360px] rounded-2xl overflow-hidden border-2 border-border bg-card" });
}
export {
  BlocklyWorkspace as default
};
