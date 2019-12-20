import React, { useState, useRef, useEffect } from 'react';
import { canvasSettings } from '../../tools';

interface IProps {
  children: React.ReactElement[];
}

const CanvasWrapper: React.FC<IProps> = ({ children }) => {
  const canvasWrapRef: any = useRef(null);
  const wrapRef: any = useRef(null);

  const [isDrag, setDrag] = useState(false);
  const [xB, setX] = useState(0);
  const [yB, setY] = useState(0);

  useEffect(() => {
    if (isDrag) window.addEventListener('mousemove', updateX);

    return () => window.removeEventListener('mousemove', updateX);
  }, [isDrag, xB, yB]);

  const updateX = (e: any) => {

    let { pageX } = e;
    let { pageY } = e;

    if (!pageX || !pageY) {
      pageX =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      pageY =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    const nextX = Math.floor(pageX);
    const nextY = Math.floor(pageY);

    setX(nextX);
    setY(nextY);
  };

  return (
    <div>
      <div
        ref={wrapRef}
        className="position-absolute"
        style={{
          top: yB,
          left: xB,
          display: isDrag ? 'block' : 'none'
        }}
      >
        <canvas
          ref={canvasWrapRef}
          width={canvasSettings.width}
          height={canvasSettings.heigth}
        />
      </div>

      {React.Children.map(children, (canvasChild: any) =>
        React.cloneElement(canvasChild, {
          isDrag,
          canvasWrapRef,
          setDrag
        })
      )}
    </div>
  );
};

export default CanvasWrapper;
