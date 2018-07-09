import React from 'react'
export default function Label(props) {
  let y
  switch(props.value) {
    case '+':
      y = props.y - window.delta * 0.405
      break
    case 'x':
      y = props.y - window.delta * 0.5
      break
    case '2':
      y = props.y - window.delta * 0.42
      break
  }
  return (<text 
    textAnchor="middle"
    alignmentBaseline="middle"
    style={{fontSize:window.delta}}
    onMouseDown={e => e.stopPropagation()}
    onClick={props.toggleOpen}
    x={props.x - window.delta * 0.5}
    y={y}>
      {props.value}
  </text>)
}