//@flow
import React, {Component} from 'react'
import './display.css'
import type {DisplayProperties, File} from './Common'
import Dropzone from 'react-dropzone'

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

  onDrop(accepted :Array<File>, rejected :Array<File>){
    let file = accepted[1]
  }

  render() {
    let style= {
      left: this.props.position.x,
      top: this.props.position.y,
      width: this.props.position.width,
      height: this.props.position.height
    }
    return (
      <Dropzone className='display' style={style} onDrop={this.onDrop.bind(this)}>
        <span className='dimensions'>
          {this.props.width}x{this.props.height}
        </span>
      </Dropzone>
    )
  }
}

export default Display
