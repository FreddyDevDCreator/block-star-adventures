
import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { TOOLBOX } from "./toolbox";


const DEFAULT_WORKSPACE_XML = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="on_start" x="20" y="20" deletable="false" movable="true"></block>
</xml>`.trim();

let blocksRegistered = false;
function registerBlocks() {
  if (blocksRegistered) return;
  blocksRegistered = true;

  // ── on_start hat block ──────────────────────────────────────────────────
  Blockly.Blocks["on_start"] = {
    init() {
      this.appendDummyInput().appendField("✦ When Run is pressed");
      this.setNextStatement(true, null);
      this.setColour("#22c55e");
      this.setTooltip("Blocks connected here will run when you press the Run button.");
      this.setHelpUrl("");
    },
  };

  javascriptGenerator.forBlock["on_start"] = () => "";

  const moves: Array<[string, string, string, () => string]> = [
    ["move_right", "Move ▶", "#3b82f6", () => "moveRight();\n"],
    ["move_up", "Move ▲", "#10b981", () => "moveUp();\n"],
    ["move_left", "Move ◀", "#6366f1", () => "moveLeft();\n"],
    ["move_down", "Move ▼", "#f59e0b", () => "moveDown();\n"],
  ];

  for (const [name, label, color, gen] of moves) {
    Blockly.Blocks[name] = {
      init() {
        this.appendDummyInput().appendField(label);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(color);
      },
    };
    javascriptGenerator.forBlock[name] = gen;
  }
}

interface BlocklyWorkspaceProps {
  onCodeChange?: (code: string) => void;
  initialXml?: string;
}

export default function BlocklyWorkspace({ onCodeChange, initialXml }: BlocklyWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    registerBlocks();

    const ws = Blockly.inject(containerRef.current, {
      toolbox: TOOLBOX as unknown as Blockly.utils.toolbox.ToolboxDefinition,
      trashcan: true,
      scrollbars: true,
      grid: { spacing: 20, length: 3, colour: "#dbeafe", snap: true },
      zoom: { controls: true, wheel: false, startScale: 1 },
      renderer: "zelos",
    });
    wsRef.current = ws;

    // Load provided XML or fall back to the default pre-placed hat block.
    const xml = initialXml ?? DEFAULT_WORKSPACE_XML;
    try {
      const dom = Blockly.utils.xml.textToDom(xml);
      Blockly.Xml.domToWorkspace(dom, ws);
    } catch {
      /* ignore malformed XML */
    }

    const emit = () => {
      const code = javascriptGenerator.workspaceToCode(ws);
      onCodeChange?.(code);
    };
    ws.addChangeListener(emit);
    emit();

    const ro = new ResizeObserver(() => Blockly.svgResize(ws));
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      ws.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden border-2 border-border bg-card"
    />
  );
}
