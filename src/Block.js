import React from 'react'
import VPill from './VPill'

export default function Block(props) {
  if(props.type === '+' || props.bIdx === 0) {
    return (<g>
      {[...Array(props.w)].map((r,i)=>(
        <rect 
        stroke="rgba(255,255,255,0.5)"
        key={i}
        x={props.x + i * props.height} 
        y={props.y} 
        width={props.height} 
        height={props.height} 
        fill={props.fill}/>
      ))}
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
      {[...Array(props.w)].map((r,i)=>(
        <rect 
        stroke="rgba(255,255,255,0.5)"
        key={i}
        x={props.x + i * props.height} 
        y={props.y} 
        width={props.height} 
        height={props.height} 
        fill={props.fill}/>
      ))}
    </g>)
  }
    
}