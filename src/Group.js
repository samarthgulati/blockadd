import React from 'react'
import Block from './Block'
import Picker from './Picker'
import HPill from './HPill'
const operations = [{
    value: '+',
    text: 'Add'
  },{
    value: 'x',
    text: 'Multiply'
  },{
    value: '2',
    text: 'Square'
  }]

export default function Group(props) {
    return (<g>
    <rect x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      stroke="black"
      fill="none"/>
    {props.blocks.map((block, i) => (<Block 
      key={i}
      gIdx={props.gIdx}
      bIdx={i}
      x={block.x} 
      y={block.y} 
      type={props.type}
      toggleEdit={props.toggleEdit}
      width={block.width} 
      w={block.x2Coord - block.xCoord}
      height={block.height} 
      fill={block.fill}/>)
    )}
    <HPill strokeWidth={8}/>
    <use xlinkHref="#hpill"
        style={{display: props.type === '+' ? 'none' : 'initial'}}
        className="ns-resize" 
        onMouseDown={e => props.toggleEdit(e, props.gIdx, 0, true)}
        x={props.x + (props.width - window.delta * 0.85) * 0.5}
        y={props.y + props.height - window.delta * 0.25}
        width={window.delta * 0.85} 
        height={window.delta * 0.5}/>
    <text 
      textAnchor="middle"
      alignmentBaseline="middle"
      style={{fontSize:window.delta}}
      x={props.x + props.width + window.delta * 0.75}
      y={props.y + props.height + window.delta * 0.75}>
        {props.math} = {props.total}
    </text>
    <Picker
      x={props.x}
      y={props.y}
      enum={operations}
      value={props.type}
      handleChange={props.handleChange}
    />
    </g>)
}