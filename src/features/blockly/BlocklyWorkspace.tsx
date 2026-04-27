// Lazy-loaded Blockly workspace. Imported via React.lazy so the Blockly
// bundle only ships when the user actually opens a coding challenge.
import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { TOOLBOX } from "./toolbox";

// Define our 4 simple movement blocks once, on first import.
let blocksRegistered = false;
function registerBlocks() {
  if (blocksRegistered) return;
  blocksRegistered = true;

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
    (javascriptGenerator as unknown as Record<string, () => string>)[name] = gen;
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

    if (initialXml) {
      try {
        const dom = Blockly.utils.xml.textToDom(initialXml);
        Blockly.Xml.domToWorkspace(dom, ws);
      } catch {
        /* ignore */
      }
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

  return <div ref={containerRef} className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden border-2 border-border bg-card" />;
}
