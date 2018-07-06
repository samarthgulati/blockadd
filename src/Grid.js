import React from 'react';
export default function Grid() {
  return <g>
    {[...Array(window.divisions)].map((l,i) => (
      <g key={i}>
        <line x1="0" x2={window.side} y1={i * window.delta} y2={i * window.delta}/>
        <line y1="0" y2={window.side} x1={i * window.delta} x2={i * window.delta}/>
      </g>
    ))}
  </g>
}