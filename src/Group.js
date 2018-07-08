import React from 'react'
import Block from './Block'
import Picker from './Picker'
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
      toggleEdit={props.toggleEdit}
      width={block.width} 
      height={block.height} 
      fill={block.fill}/>)
    )}
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