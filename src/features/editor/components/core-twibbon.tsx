"use client";

import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useEditor } from "../hooks/use-editor";

interface CoreTwibbonProps {
  initialData?: { json?: string; width?: number; height?: number };
  onSave?: (values: { json: string; height: number; width: number }) => void;
  onEditorReady?: (editor: any) => void;
}

export const CoreTwibbon = ({ initialData, onSave, onEditorReady }: CoreTwibbonProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { init, editor } = useEditor({
    defaultState: initialData?.json,
    defaultWidth: initialData?.width || 1080,
    defaultHeight: initialData?.height || 1080,
    saveCallback: onSave,
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => canvas.dispose();
  }, [init]);

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  return (
    <div ref={containerRef} className="h-full w-full bg-slate-50">
      <canvas ref={canvasRef} />
    </div>
  );
};
