import React from 'react'
import VPill from './VPill'
export default function Block(props) {
    return (<g>
      <VPill strokeWidth={8}/>
      <rect 
        x={props.x} 
        y={props.y} 
        width={props.width} 
        height={props.height} 
        fill={props.fill}/>
      {/* <line style={{stroke:"black", strokeWidth:2}} 
            x1={props.x}
            y1={props.y}
            x2={props.x + props.width}
            y2={props.y}/>
      
      <line style={{stroke:"black", strokeWidth:2}} 
            x1={props.x}
            y1={props.y}
            x2={props.x}
            y2={props.y + props.height}/>
      
      <line style={{stroke:"black", strokeWidth:2}} 
            x1={props.x + props.width}
            y1={props.y}
            x2={props.x + props.width}
            y2={props.y + props.height}/>
      
      <line style={{stroke:"black", strokeWidth:2}} 
            x1={props.x}
            y1={props.y + props.height}
            x2={props.x + props.width}
            y2={props.y + props.height}/> */}
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
}