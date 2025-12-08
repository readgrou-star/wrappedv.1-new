import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";
import { Editor, BuildEditorProps, EditorHookProps, FILL_COLOR, STROKE_COLOR, STROKE_WIDTH, FONT_SIZE, JSON_KEYS } from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { useAutoResize } from "./use-auto-resize";

const buildEditor = ({ canvas, save, autoZoom }: BuildEditorProps): Editor => {
  const getWorkspace = () => canvas.getObjects().find((obj) => obj.name === "clip");

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const centerPoint = workspace?.getCenterPoint();
    if (!centerPoint) return;
    // @ts-ignore
    canvas._centerObject(object, centerPoint);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    canvas,
    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        left: 100,
        top: 100,
        fill: FILL_COLOR,
        fontSize: FONT_SIZE,
        ...options,
      });
      addToCanvas(object);
    },
    addImage: (value) => {
      fabric.Image.fromURL(value, (image) => {
        const workspace = getWorkspace();
        image.scaleToWidth(workspace?.width || 0);
        image.scaleToHeight(workspace?.height || 0);
        addToCanvas(image);
      }, { crossOrigin: "anonymous" });
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        left: 100,
        top: 100,
        fill: FILL_COLOR,
        stroke: STROKE_COLOR,
        strokeWidth: STROKE_WIDTH,
        width: 400,
        height: 400,
      });
      addToCanvas(object);
    },
    addCircle: () => {
      const object = new fabric.Circle({
        radius: 225,
        left: 100,
        top: 100,
        fill: FILL_COLOR,
        stroke: STROKE_COLOR,
        strokeWidth: STROKE_WIDTH,
      });
      addToCanvas(object);
    },
    delete: () => {
      canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    changeFillColor: (value) => {
      canvas.getActiveObjects().forEach((obj) => obj.set({ fill: value }));
      canvas.renderAll();
    },
    changeStrokeColor: (value) => {
      canvas.getActiveObjects().forEach((obj) => obj.set({ stroke: value }));
      canvas.renderAll();
    },
    saveJson: () => {
      const dataUrl = canvas.toJSON(JSON_KEYS);
      const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataUrl, null, "\t"))}`;
      const link = document.createElement("a");
      link.href = fileString;
      link.download = "design.json";
      link.click();
    },
    loadJson: (json) => {
      const data = JSON.parse(json);
      canvas.loadFromJSON(data, () => autoZoom());
    },
    autoZoom,
  };
};

export const useEditor = ({ defaultState, defaultWidth, defaultHeight, saveCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const save = useCallback(() => {
    if (!canvas || !saveCallback) return;
    const json = JSON.stringify(canvas.toJSON(JSON_KEYS));
    const workspace = canvas.getObjects().find((obj) => obj.name === "clip") as fabric.Rect;
    saveCallback({ json, width: workspace?.width || defaultWidth || 900, height: workspace?.height || defaultHeight || 1200 });
  }, [canvas, saveCallback, defaultWidth, defaultHeight]);

  const { autoZoom } = useAutoResize({ canvas, container });

  useCanvasEvents({ save, canvas, setSelectedObjects });

  const editor = useMemo(() => {
    if (canvas) return buildEditor({ canvas, save, autoZoom });
    return undefined;
  }, [canvas, save, autoZoom]);

  const init = useCallback(({ initialCanvas, initialContainer }: { initialCanvas: fabric.Canvas; initialContainer: HTMLDivElement }) => {
    fabric.Object.prototype.set({
      cornerColor: "#FFF",
      cornerStyle: "circle",
      borderColor: "#3b82f6",
      borderScaleFactor: 1.5,
      transparentCorners: false,
      borderOpacityWhenMoving: 1,
      cornerStrokeColor: "#3b82f6",
    });

    const workspace = new fabric.Rect({
      width: defaultWidth || 900,
      height: defaultHeight || 1200,
      name: "clip",
      fill: "white",
      selectable: false,
      hasControls: false,
      shadow: new fabric.Shadow({ color: "rgba(0,0,0,0.8)", blur: 5 }),
    });

    initialCanvas.setWidth(initialContainer.offsetWidth);
    initialCanvas.setHeight(initialContainer.offsetHeight);
    initialCanvas.add(workspace);
    initialCanvas.centerObject(workspace);
    initialCanvas.clipPath = workspace;

    if (defaultState) {
      const data = JSON.parse(defaultState);
      initialCanvas.loadFromJSON(data, () => {
        setCanvas(initialCanvas);
        setContainer(initialContainer);
      });
    } else {
      setCanvas(initialCanvas);
      setContainer(initialContainer);
    }
  }, [defaultState, defaultWidth, defaultHeight]);

  return { init, editor };
};
