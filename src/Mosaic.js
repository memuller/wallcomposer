//@flow

import React, { Component } from 'react'
import Display from './Display'
import type {Bounds, BasicDisplay, ElectronDisplay, DisplayProperties} from './Common'
const electron = window.require('electron')

type State = {
  stage: number,
  displays: Array<BasicDisplay>,
  bounds?: Bounds,
  displayPositions?: Array<DisplayProperties>
}

type Props = {
  width?: Number,
  height?: Number
}

class Mosaic extends Component<void, Props, State> {
  state: State
  props: Props

  constructor(){
    super()
    this.state = {
      stage:      -1,
      displays:   Mosaic.getDisplays(),
    }
  }

  static getDisplays() :Array<BasicDisplay> {
    return electron.screen.getAllDisplays().map((d :ElectronDisplay) => {
      let obj = {}
      let properties = ['width', 'height', 'x', 'y']
      properties.forEach(property => obj[property] = d.bounds[property])
      return obj
    })
  }

  get containerBounds() :Bounds {
    return { x: Number(this.props.width), y: Number(this.props.width) }
  }

  get bounds() :Bounds {
    if(this.state.bounds) return this.state.bounds

    let bounds :Bounds = {x: 0, y: 0}
    this.state.displays.forEach((d :BasicDisplay) => {
      let [x,y] = [
        Number(d.x) + Number(d.width),
        Number(d.y) + Number(d.height)
      ]
      if(x > bounds.x) bounds.x = x
      if(y > bounds.y) bounds.y = y
    })
    this.setState({ bounds: bounds })

    return bounds
  }

  get displayPositions() :Array<DisplayProperties> {
    if(this.state.displayPositions) return this.state.displayPositions

    let positions = []
    let bounds = this.bounds
    this.state.displays.forEach((display :BasicDisplay, i) => {
      console.log(this.props.height)
      positions[i] = {
        x: this.containerBounds.x * Number(display.x) /bounds.x,
        y: this.containerBounds.y * Number(display.y) /bounds.x,
        width: this.containerBounds.x * Number(display.width) /bounds.x,
        height: this.containerBounds.y * Number(display.height) /bounds.x,
      }
    })

    let offsetY = Math.abs(Math.min(...positions.map(o => Number(o.y))))
    let offsetX = Math.abs(Math.min(...positions.map(o => Number(o.x))))

    positions.forEach((display :DisplayProperties, i) => {
        positions[i].y +=offsetY
        positions[i].x +=offsetX
    })

    this.setState({ displayPositions: positions })
    return positions
  }

  componentWillMount(){
    this.bounds && this.displayPositions
  }

  render(){
    let displays = this.state.displays.map((display :BasicDisplay, i) => {
      return (
        <Display
          key={i}
          x={display.x} y={display.y}
          width={display.width} height={display.height}
          position={this.displayPositions[i]}
        />
      )
    })

    return (
      <div id='displays'>{displays}</div>
    )
  }
}

export default Mosaic
