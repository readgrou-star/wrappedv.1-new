"use client";

import { fabric } from "fabric";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { useCanvasEvents } from "@/features/editor/hooks/use-canvas-events";
import { FILL_COLOR, STROKE_COLOR, STROKE_WIDTH, FONT_SIZE, JSON_KEYS } from "@/features/editor/types";
import { Plus } from "lucide-react";

interface CoreBuilderLandingProps {
  bgImage?: string;
  onSave?: (json: string) => void;
  onEditorReady?: (editor: any) => void;
}

export function CoreBuilderLanding({ bgImage, onSave, onEditorReady }: CoreBuilderLandingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [canvasHeight, setCanvasHeight] = useState(1080);

  const save = useCallback(() => {
    if (!canvas || !onSave) return;
    const json = JSON.stringify(canvas.toJSON(JSON_KEYS));
    onSave(json);
  }, [canvas, onSave]);

  useCanvasEvents({ save, canvas, setSelectedObjects });

  const addSpace = () => {
    const newHeight = canvasHeight + 1080;
    setCanvasHeight(newHeight);
    if (canvas) {
      canvas.setHeight(newHeight);
      canvas.renderAll();
    }
  };

  const editor = useMemo(() => {
    if (!canvas) return null;

    const addToCanvas = (object: fabric.Object) => {
      const scrollTop = containerRef.current?.scrollTop || 0;
      const viewportHeight = containerRef.current?.offsetHeight || 0;
      const centerY = scrollTop + viewportHeight / 2;
      
      object.set({
        left: canvas.getWidth() / 2,
        top: centerY,
        originX: 'center',
        originY: 'center'
      });
      
      canvas.add(object);
      canvas.setActiveObject(object);
      canvas.renderAll();
    };

    return {
      canvas,
      addText: (value: string) => {
        addToCanvas(new fabric.Textbox(value, { fill: FILL_COLOR, fontSize: FONT_SIZE }));
      },
      addRectangle: () => {
        addToCanvas(new fabric.Rect({ fill: FILL_COLOR, stroke: STROKE_COLOR, strokeWidth: STROKE_WIDTH, width: 400, height: 400 }));
      },
      addCircle: () => {
        addToCanvas(new fabric.Circle({ radius: 225, fill: FILL_COLOR, stroke: STROKE_COLOR, strokeWidth: STROKE_WIDTH }));
      },
      delete: () => {
        canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
        canvas.discardActiveObject();
        canvas.renderAll();
      },
      changeFillColor: (value: string) => {
        canvas.getActiveObjects().forEach((obj) => obj.set({ fill: value }));
        canvas.renderAll();
      },
      changeStrokeColor: (value: string) => {
        canvas.getActiveObjects().forEach((obj) => obj.set({ stroke: value }));
        canvas.renderAll();
      },
    };
  }, [canvas]);

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Handle background image change
  useEffect(() => {
    if (!canvas) return;
    
    // Canvas transparent, parent container handles background
    canvas.backgroundColor = 'transparent';
    canvas.renderAll();
  }, [bgImage, canvas]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
      backgroundColor: 'transparent',
    });

    fabric.Object.prototype.set({
      cornerColor: "#FFF",
      cornerStyle: "circle",
      borderColor: "#3b82f6",
      borderScaleFactor: 1.5,
      transparentCorners: false,
      borderOpacityWhenMoving: 1,
      cornerStrokeColor: "#3b82f6",
    });

    fabricCanvas.setWidth(containerRef.current.offsetWidth);
    fabricCanvas.setHeight(canvasHeight);

    setCanvas(fabricCanvas);

    return () => fabricCanvas.dispose();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full overflow-y-auto">
      <canvas ref={canvasRef} />
      <div className="flex justify-center py-8">
        <button onClick={addSpace} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition shadow-lg">
          <Plus className="w-4 h-4" /> Add Space
        </button>
      </div>
    </div>
  );
}
