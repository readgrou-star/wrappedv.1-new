import { fabric } from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.setWidth(width);
    canvas.setHeight(height);

    const workspace = canvas.getObjects().find((obj) => obj.name === "clip");
    if (!workspace) return;

    const scale = Math.min(
      width / workspace.width!,
      height / workspace.height!
    );

    const center = canvas.getCenter();
    canvas.setViewportTransform(fabric.iMatrix.concat());
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale * 0.85);

    const workspaceCenter = workspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (viewportTransform) {
      viewportTransform[4] = width / 2 - workspaceCenter.x * viewportTransform[0];
      viewportTransform[5] = height / 2 - workspaceCenter.y * viewportTransform[3];
    }
    canvas.requestRenderAll();
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | undefined;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => autoZoom());
      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [canvas, container, autoZoom]);

  return { autoZoom };
};
