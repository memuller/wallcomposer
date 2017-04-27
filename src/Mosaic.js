//@flow

import React, { Component } from 'react'
import Display from './Display'

const electron = window.require('electron')

type ElectronDisplay = {
  width: Number, height: Number, x: Number, y: Number
}

type State = {
  stage: number,
  displays: Array<ElectronDisplay>
}

type Props = {}


class Mosaic extends Component<void, Props, State> {
  state: State
  props: Props

  static getDisplays() :Array<ElectronDisplay> {
    return electron.screen.getAllDisplays().map((d) => {
      let obj = {}
      let properties = ['width', 'height', 'x', 'y']
      properties.forEach(property => obj[property] = d.bounds[property])
      return obj
    })
  }

  constructor(){
    super()
    this.state = {
      stage: -1,
      displays: Mosaic.getDisplays()
    }
  }

  render(){
    let displays = this.state.displays.map((display, i) => {
      return (
        <Display  key={i}
                  width={display.width}
                  x={display.x}
                  height={display.height}
                  y={display.y}
        />
      )
    })

    return (
      <div>{displays}</div>
    )
  }
}

export default Mosaic
