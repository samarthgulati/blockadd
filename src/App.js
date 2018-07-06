import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBlock, toggleEdit, resizeBlock } from './actions/blockActions'

import Grid from './Grid';
import Block from './Block';
import './App.css';

class App extends Component {
  createBlock = (event) => {
    const blockCount = this.props.canvas.blocks.length
    if(blockCount !== 0 && this.props.canvas.editIndex !== null) return
    event.persist()
    const payload = {
      x: event.clientX,
      y: event.clientY
    }
    this.props.createBlock(payload)
  }
  toggleEdit = (event, idx) => {
    // const blockCount = this.props.canvas.blocks.length
    // if(blockCount === 0) return
    if(this.props.canvas.editIndex === null && isNaN(idx)) return
    event.stopPropagation()
    const payload = {
      idx
    }
    this.props.toggleEdit(payload)
  }
  resizeBlock = (event) => {
    const blockCount = this.props.canvas.blocks.length
    if(blockCount === 0 || this.props.canvas.editIndex === null) return
    event.persist()
    event.stopPropagation()
    const payload = {
      x: event.clientX,
      y: event.clientY
    }
    this.props.resizeBlock(payload)
  }
  render() {
    return (
      <svg viewBox={`0 0 ${window.side} ${window.side}`} 
          width={window.side} height={window.side}
          onMouseDown={this.createBlock}
          onMouseMove={this.resizeBlock}
          onMouseUp={this.toggleEdit}>
          <Grid/>
          {this.props.canvas.blocks.map((block, i) => 
            <Block 
              key={i}
              idx={i}
              x={block.x} 
              y={block.y} 
              toggleEdit={this.toggleEdit}
              width={block.width} 
              height={block.height} 
              fill={block.fill}/>)
          }
      </svg>
    );
  }
}
const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
  createBlock: (payload) => dispatch(createBlock(payload)),
  toggleEdit: (payload) => dispatch(toggleEdit(payload)),
  resizeBlock: (payload) => dispatch(resizeBlock(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
