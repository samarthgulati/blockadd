import React, { Component } from 'react'
export default class Block extends Component {
  render() {
    return (<g>
      <rect 
        x={this.props.x} 
        y={this.props.y} 
        width={this.props.width} 
        height={this.props.height} 
        fill={this.props.fill}/>
      {/* top */}
      <line style={{stroke:"black", strokeWidth:2}} 
            x1={this.props.x}
            y1={this.props.y}
            x2={this.props.x + this.props.width}
            y2={this.props.y}/>
      {/* left */}
      <line className="ew-resize" 
            style={{stroke:"black", strokeWidth:2}} 
            onMouseDown={e => this.props.toggleEdit(e, this.props.idx)}
            x1={this.props.x}
            y1={this.props.y}
            x2={this.props.x}
            y2={this.props.y + this.props.height}/>
      {/* right */}
      <line className="ew-resize" 
            style={{stroke:"black", strokeWidth:2}} 
            onMouseDown={e => this.props.toggleEdit(e, this.props.idx)}
            x1={this.props.x + this.props.width}
            y1={this.props.y}
            x2={this.props.x + this.props.width}
            y2={this.props.y + this.props.height}/>
      {/* bottom */}
      <line style={{stroke:"black", strokeWidth:2}} 
            x1={this.props.x}
            y1={this.props.y + this.props.height}
            x2={this.props.x + this.props.width}
            y2={this.props.y + this.props.height}/>
    </g>)
  }
}