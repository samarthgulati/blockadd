import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBlock, toggleEdit, resizeBlock, changeOperator } from './actions/blockActions'

import Grid from './Grid'
import Group from './Group'
import './App.css'

class App extends Component {
  createBlock = (event) => {
    const blockCount = this.props.canvas.groups.length
    if(blockCount !== 0 && this.props.canvas.editIndices.gIdx !== null) return
    event.persist()
    const payload = {
      x: event.clientX,
      y: event.clientY
    }
    this.props.createBlock(payload)
  }
  toggleEdit = (event, gIdx, bIdx) => {
    // const blockCount = this.props.canvas.groups.length
    // if(blockCount === 0) return
    if(this.props.canvas.editIndices.gIdx === null && isNaN(gIdx) && isNaN(bIdx)) return
    event.stopPropagation()
    const payload = {
      gIdx, bIdx
    }
    this.props.toggleEdit(payload)
  }
  resizeBlock = (event) => {
    const blockCount = this.props.canvas.groups.length
    if(blockCount === 0 || this.props.canvas.editIndices.gIdx === null) return
    event.persist()
    event.stopPropagation()
    const payload = {
      x: event.clientX,
      y: event.clientY
    }
    this.props.resizeBlock(payload)
  }
  handleTypeChange = (gIdx, type) => {
    this.props.changeOperator({gIdx, type})
  }
  render() {
    return (<svg viewBox={`0 0 ${window.side} ${window.side}`} 
          width={window.side} height={window.side}
          onMouseDown={this.createBlock}
          onMouseMove={this.resizeBlock}
          onMouseUp={this.toggleEdit}>
          <Grid/>
          {this.props.canvas.groups.map((group, i) => 
          <Group 
              key={i}
              gIdx={i}
              x={group.x} 
              y={group.y} 
              blocks={group.blocks}
              toggleEdit={this.toggleEdit}
              handleChange={val => this.handleTypeChange(i, val)}
              width={group.width} 
              height={group.height} 
              type={group.type} 
              math={group.math} 
              total={group.total} 
              fill={group.fill}/>)
          }
      </svg>);
  }
}
const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = dispatch => ({
  createBlock: (payload) => dispatch(createBlock(payload)),
  toggleEdit: (payload) => dispatch(toggleEdit(payload)),
  resizeBlock: (payload) => dispatch(resizeBlock(payload)),
  changeOperator: (payload) => dispatch(changeOperator(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
