import React from 'react';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

export default function ZoomTools({
  zoomIn,
  zoomOut,
  resetTransform,
  ...props
}: ReactZoomPanPinchRef) {
  const zoomPercentage = props.state.scale * 100;
  console.log('<ZoomTools> ', props);

  return (
    <div className="ZoomTools">
      <button
        className="Zoom Zoom--Out"
        title="Zoom out"
        onClick={() => zoomOut()}
      >
        -
      </button>
      <div className="ZoomLevel">{zoomPercentage}%</div>
      <button
        className="Zoom Zoom--In"
        title="Zoom in"
        onClick={() => zoomIn()}
      >
        +
      </button>

      <button
        className="Zoom Zoom--Reset"
        title="Reset"
        onClick={() => resetTransform()}
      >
        x
      </button>
    </div>
  );
}
