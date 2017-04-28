//@flow
import React, {Component} from 'react'
import './display.css'
import type {Bounds, DisplayProperties} from './Common'

type Props = {
  width: Number,
  height: Number,
  x: Number,
  y: Number,
  key?: Number,
  position: DisplayProperties,
}
type State = {
  populated: boolean
}

class Display extends Component<void, Props, State> {
  props: Props
  state: State

  constructor(props :Props){
    super(props)
    this.state = { populated: false }

  }



  render() {
    let style= {
      left: this.props.position.x,
      top: this.props.position.y,
      width: this.props.position.width,
      height: this.props.position.height
    }
    return (
      <span className='display' style={style}>
        <span className='dimensions'>
          {this.props.width}x{this.props.height}
        </span>
      </span>
    )
  }
}

export default Display
