import React, { Component } from 'react';
import Block from './Block';


export default function Group(props) {
    return (<g>
    <circle
      cx={props.x - window.delta * 0.5}
      cy={props.y - window.delta * 0.5}
      r={window.delta * 0.5}
      fill="white"
      stroke="black"
    />
    <text 
      textAnchor="middle"
      alignmentBaseline="middle"
      style={{fontSize:window.delta}}
      x={props.x - window.delta * 0.5}
      y={props.y - window.delta * 0.5}>
        {props.type}
    </text>
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
    </g>)
}