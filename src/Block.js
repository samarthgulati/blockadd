import React from 'react'
import VPill from './VPill'

export default function Block(props) {
  if(props.type === '+' || props.bIdx === 0) {
    return (<g>
      <rect 
        x={props.x} 
        y={props.y} 
        width={props.width} 
        height={props.height} 
        fill={props.fill}/>
      <VPill strokeWidth={8}/>
      <use href="#vpill"
          className="ew-resize" 
          onMouseDown={e => props.toggleEdit(e, props.gIdx, props.bIdx)}
          x={props.x - props.height * 0.25} 
          y={props.y + props.height * 0.125} 
          width={props.height * 0.5} 
          height={props.height * 0.75}/>
      <use href="#vpill"
          className="ew-resize" 
          onMouseDown={e => props.toggleEdit(e, props.gIdx, props.bIdx)}
          x={props.x + props.width - props.height * 0.25} 
          y={props.y + props.height * 0.125} 
          width={props.height * 0.5} 
          height={props.height * 0.75}/>
    </g>) 
  } else {
    return (<g>
      <rect 
        x={props.x} 
        y={props.y} 
        width={props.width} 
        height={props.height} 
        fill={props.fill}/>
    </g>)
  }
    
}