import React, { Component } from 'react'
import Button from './Button'
export default class Picker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  toggleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }
  handleClick = (value) => {
    this.props.handleChange(value)
    this.toggleOpen()
  }
  render() {
    return (<g>
    <circle
      cx={this.props.x - window.delta * 0.5}
      cy={this.props.y - window.delta * 0.5}
      r={window.delta * 0.5}
      fill="white"
      stroke="black"
      onMouseDown={e => e.stopPropagation()}
      onClick={this.toggleOpen}
    />
    <text 
      textAnchor="middle"
      alignmentBaseline="middle"
      style={{fontSize:window.delta}}
      onMouseDown={e => e.stopPropagation()}
      onClick={this.toggleOpen}
      x={this.props.x - window.delta * 0.5}
      y={this.props.y - window.delta * 0.5}>
        {this.props.value}
    </text>
    <g style={{display:this.state.open?'initial':'none'}}>
    {this.props.enum.map((e,i)=>{
      const height = window.delta
      const width = height * 3
      return (<Button
        selected={this.props.value === e.value}
        key={i}
        x={this.props.x}
        y={this.props.y + height * i}
        width={width}
        height={height}
        value={e.value}
        text={e.text}
        handleClick={_ => this.handleClick(e.value)}
      />)})
    }
    </g>
    </g>)
  }
}