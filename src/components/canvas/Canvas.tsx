import React, { useEffect, useRef } from "react";
import { useTypedSelector } from "../../utils/useTypedSelector";
import { useActions } from "../../utils/useActions";
import { ToolTypes } from "../../types/tools";
import { brushDraw } from "../../utils/tools/brushDraw";
import { rectDraw } from "../../utils/tools/rectDraw";
import { circleDraw } from "../../utils/tools/circleDraw";
import { lineDraw } from "../../utils/tools/lineDraw";
import Toolbar from "../toolbar/Toolbar";
import { CanvasList, CanvasWrap } from "./Canvas.style";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const { isDraw, strokeColor, fillColor, lineWidth, saved } = useTypedSelector(
    (state) => state.draw
  );

  const { tool, startX, startY, width, height } = useTypedSelector(
    (state) => state.tool
  );

  const {
    drawAction,
    setSaved,
    rectAction,
    circleAction,
    lineAction,
    setWithAndHeight,
    canvasAction,
    ctxAction,
    saveImageURL,
  } = useActions();

  let img: HTMLImageElement = new Image();

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    ctx!.lineCap = "round";
    ctx!.strokeStyle = strokeColor;
    ctx!.fillStyle = fillColor;
    ctx!.lineWidth = lineWidth;
    ctxRef.current = ctx;
    canvasAction(canvasRef);
    ctxAction(ctxRef);
    // eslint-disable-next-line
  }, [strokeColor, fillColor, lineWidth]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;

    switch (tool) {
      case ToolTypes.BRUSH:
        drawAction(true);
        ctxRef!.current!.beginPath();
        ctxRef!.current!.moveTo(offsetX, offsetY);
        setSaved(canvasRef!.current!.toDataURL());
        break;
      case ToolTypes.RECT:
        drawAction(true);
        ctxRef!.current!.beginPath();
        rectAction(offsetX, offsetY);
        setSaved(canvasRef!.current!.toDataURL());
        break;
      case ToolTypes.CIRCLE:
        drawAction(true);
        ctxRef!.current!.beginPath();
        circleAction(offsetX, offsetY);
        setSaved(canvasRef!.current!.toDataURL());
        break;
      case ToolTypes.LINE:
        drawAction(true);
        lineAction(offsetX, offsetY);
        ctxRef!.current!.beginPath();
        ctxRef!.current!.moveTo(startX, startY);
        setSaved(canvasRef!.current!.toDataURL());
        break;
      default:
        return;
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDraw) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    switch (tool) {
      case ToolTypes.BRUSH:
        brushDraw(canvasRef, ctxRef, offsetX, offsetY);
        break;
      case ToolTypes.RECT:
        rectDraw(
          canvasRef,
          ctxRef,
          img,
          saved,
          setWithAndHeight,
          offsetX,
          offsetY,
          startX,
          startY,
          width,
          height
        );
        break;
      case ToolTypes.CIRCLE:
        circleDraw(
          canvasRef,
          ctxRef,
          img,
          saved,
          setWithAndHeight,
          offsetX,
          offsetY,
          startX,
          startY,
          width,
          height
        );
        break;
      case ToolTypes.LINE:
        lineDraw(
          canvasRef,
          ctxRef,
          img,
          saved,
          offsetX,
          offsetY,
          startX,
          startY
        );
        break;
      default:
        return;
    }
  };

  const finishDrawing = () => {
    drawAction(false);
    ctxRef!.current!.closePath();
    saveImageURL(canvasRef!.current!.toDataURL());
  };

  return (
    <CanvasWrap>
      <Toolbar />
      <CanvasList
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
        ref={canvasRef}
        width={800}
        height={600}
      />
    </CanvasWrap>
  );
};

export default Canvas;
