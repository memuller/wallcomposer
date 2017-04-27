//@flow
import React, {Component} from 'react'
import './display.css'

type Props = {
  key?: Number,
  width: Number,
  height: Number,
  x: Number,
  y: Number
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
    return (
      <span className='display'>
        <span className='dimensions'>
          {this.props.width}x{this.props.height}
        </span>
      </span>
    )
  }
}

export default Display
