import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const FONT_SIZE = 32;

export const JSON_KEYS = ["name", "selectable", "hasControls"];

export interface EditorHookProps {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  saveCallback?: (values: { json: string; height: number; width: number }) => void;
}

export interface BuildEditorProps {
  canvas: fabric.Canvas;
  save: () => void;
  autoZoom: () => void;
}

export interface Editor {
  canvas: fabric.Canvas;
  addText: (value: string, options?: ITextboxOptions) => void;
  addImage: (value: string) => void;
  addRectangle: () => void;
  addCircle: () => void;
  delete: () => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  saveJson: () => void;
  loadJson: (json: string) => void;
  autoZoom: () => void;
}
