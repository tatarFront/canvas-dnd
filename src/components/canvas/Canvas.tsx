//NOTE: This is a component-section for lines
import React, { useRef, useEffect, useCallback, MouseEvent } from 'react';

import { ICanvasElement, ICanvas } from '../../interfaces';
import { canvasSettings } from '../../tools';
interface IProps {
  data?: ICanvasElement[];
  keyName: keyof ICanvas;

  canvasWrapRef?: any;
  setDrag?: any;

  create: (keyName: keyof ICanvas) => void;
  replace: (
    keyName: keyof ICanvas,
    points: number[],
    nextPoints: number[]
  ) => void;
  update: (
    keyName: keyof ICanvas,
    prevPoints: number[],
    nextPoints: number[]
  ) => void;
}

const Canvas: React.FC<IProps> = ({
  data,
  keyName,
  create,
  replace,
  update,
  canvasWrapRef,
  setDrag
}) => {
  const canvasRef: any = useRef(null);
  const prevDataRef: any = useRef([]);
  const dragLine: any = useRef(null);

  useEffect(() => init());

  const init = () => {
    if (canvasRef.current && !compareData(data, prevDataRef.current)) {
      const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
      if(ctx) {
        ctx.clearRect(0, 0, canvasSettings.width, canvasSettings.heigth);
        data &&
          data.forEach(item => {
            createLine(item.canvasPoints, item.color);
          });
  
        ctx.beginPath();
        ctx.stroke();
      }

      //NOTE: save prevProps
      prevDataRef.current = data;
    }
  };

  const generate2PathElement = (points: number[]) => {
    const [a1, b1, a2, b2, a3, b3] = points;
    const line = new Path2D();
    line.moveTo(a1, b1);
    line.lineTo(a2, b2);
    line.lineTo(a3, b3);

    return line;
  };

  const createLine = (points: any, color: string) => {
    const ctx = canvasRef.current.getContext('2d');
    const line = generate2PathElement(points);

    ctx.lineWidth = canvasSettings.lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.stroke(line);
  };

  const compareData = useCallback((currentData, nextData) => {
    if (currentData.length !== nextData.length) return false;

    return !currentData.some((curItem: ICanvasElement, i: number) => {
      const nextItem = nextData[i];
      return JSON.stringify(curItem) !== JSON.stringify(nextItem);
    });
  }, []);

  const onMouseDown = function(e: MouseEvent) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mousePos = {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop
    };

    data &&
      data.some((item: any): any => {
        const line = generate2PathElement(item.canvasPoints);
        if (ctx.isPointInStroke(line, mousePos.x, mousePos.y)) {
          setDrag(true);

          dragLine.current = { ...item, canvasPointsPrev: item.canvasPoints };
          const canvasWrap = canvasWrapRef.current;

          if (canvasWrap && dragLine.current) {
            const [a1, b1, a2, b2, a3, b3] = item.canvasPoints;
            const minA = Math.min(a1, a2, a3) - canvasSettings.lineWidth / 2;
            const minB = Math.min(b1, b2, b3) - canvasSettings.lineWidth / 2;

            const lineCopy = generate2PathElement([
              a1 - minA,
              b1 - minB,
              a2 - minA,
              b2 - minB,
              a3 - minA,
              b3 - minB
            ]);
            const ctxWrap = canvasWrap.getContext('2d');
            ctxWrap.lineWidth = canvasSettings.lineWidth;
            ctxWrap.strokeStyle = dragLine.current.color;
            ctxWrap.beginPath();
            ctxWrap.stroke(lineCopy);
          }

          canvas.onmousemove = onMouseMove;
          canvasWrapRef.current.onmousemove = onMouseMove;
          canvasWrapRef.current.onmouseup = onMouseUp;
          return true;
        }

        return false;
      });
  };

  function onMouseMove(e: MouseEvent) {
    if (dragLine.current) {
      const [a1, b1, a2, b2, a3, b3] = dragLine.current.canvasPoints;
      dragLine.current.canvasPoints = [
        a1 + e.movementX,
        b1 + e.movementY,
        a2 + e.movementX,
        b2 + e.movementY,
        a3 + e.movementX,
        b3 + e.movementY
      ];
    }
  }

  function onMouseUp(e: MouseEvent) {
    setDrag(false);
    const canvasWrap = canvasWrapRef.current;
    const canvas = canvasRef.current;
    const mousePos = {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop
    };
    if (dragLine.current) {
      const [a1, b1, a2, b2, a3, b3] = dragLine.current.canvasPoints;
      if (mousePos.y > canvasSettings.heigth || mousePos.y <= 0) {
        const coefficient =
          keyName === 'firstCanvas'
            ? -1 * canvasSettings.k
            : canvasSettings.k + 20;

        const nextPoints = [
          a1,
          b1 - mousePos.y - coefficient,
          a2,
          b2 - mousePos.y - coefficient,
          a3,
          b3 - mousePos.y - coefficient
        ];

        const isBeside =
          Math.max(nextPoints[1], nextPoints[3], nextPoints[5]) < 0 ||
          Math.min(nextPoints[1], nextPoints[3], nextPoints[5]) >
            canvasSettings.heigth;
        replace(
          keyName,
          dragLine.current.canvasPointsPrev,
          isBeside ? dragLine.current.canvasPointsPrev : nextPoints
        );
      } else {
        update(
          keyName,
          dragLine.current.canvasPointsPrev,
          dragLine.current.canvasPoints
        );
      }
      dragLine.current = null;
    }

    if (canvasWrap) {
      const ctxWrap = canvasWrapRef.current
        ? canvasWrapRef.current.getContext('2d')
        : null;
      ctxWrap.clearRect(0, 0, canvasSettings.width, canvasSettings.heigth);
      canvas.onmousemove = null;
      canvasWrapRef.current.onmousemove = null;
      canvasWrapRef.current.onmouseup = null;
    }
  }

  return (
    <div
      className="shadow p-3 mb-5 bg-white rounded"
      style={{ backgroundColor: 'white' }}
    >
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => create(keyName)}
      >
        Create new line
      </button>
      <div>
        <canvas
          id={keyName}
          ref={canvasRef}
          width={canvasSettings.width}
          height={canvasSettings.heigth}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    </div>
  );
};

export default Canvas;
