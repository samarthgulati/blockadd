import React from 'react'
import './Button.css'

export default function Button(props) {
  const classes = `button ${props.selected ? 'selected' : ''}`
  return (<g className={classes}
    onMouseDown={e => e.stopPropagation()}
    onClick={_ => {props.handleClick(props.value)}}>
    <rect x={props.x} y={props.y} 
      width={props.width} height={props.height}/>
    <text x={props.x + props.width * 0.5} y={props.y + props.height * 0.5} 
      width={props.width} height={props.height}
      textAnchor="middle"
      alignmentBaseline="middle">
      {props.text}
    </text>
  </g>)
}