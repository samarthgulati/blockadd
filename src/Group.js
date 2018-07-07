import React, { Component } from 'react';
import Block from './Block';


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
    </g>)
}