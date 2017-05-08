//@flow

import React, { Component } from 'react'
import Display from './Display'
import type {Bounds, BasicDisplay, ElectronDisplay, DisplayProperties, Image} from './Common'

import 'jimp/browser/lib/jimp'
import Download from 'react-file-download'

import Denodeify from 'es6-denodeify'
const denodeify = Denodeify(Promise)

const electron = window.require('electron')

type State = {
  stage: number,
  displays: Array<BasicDisplay>,
  bounds?: Bounds,
  displayPositions?: Array<DisplayProperties>,
  children: Array<React$Element<any>>,
  images: Array<Image>
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
      children:   [],
      images:     []
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
    let bounds = this.state.bounds ? this.state.bounds : this.getBounds()
    return bounds
  }

  getBounds() :Bounds {
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
    let displays = this.state.displayPositions ? this.state.displayPositions : this.getDisplayPositions()

    return displays
  }

  getDisplayPositions() :Array<DisplayProperties> {
    let positions = []
    let bounds = this.bounds
    this.state.displays.forEach((display :BasicDisplay, i) => {
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

  buildDisplays() :void {
    this.setState({ children: this.state.displays.map((display :BasicDisplay, i) => {
      return (
        <Display
          key={i} id={i}
          x={display.x} y={display.y}
          width={display.width} height={display.height}
          position={this.displayPositions[i]}
          display={display}
          onUpdate={this.displayUpdated.bind(this)}
        />
      )
    })
    })
  }

  displayUpdated(which :number, image :Image){
    if(this.isReady) this.clear()

    let images = this.state.images
    images[which] = image
    this.setState({ images: images })

    if(this.isReady) this.assemble()
  }

  get isReady() :boolean {
    let filledDisplays = this.state.images.reduce((acc,val) => {
      return acc + (val ? 1 : 0)
    }, 0)

    return filledDisplays == this.state.displays.length
  }

  clear() :void {
    this.setState({ images: [] })
  }

  assemble() :void {
    let Jimp = window.Jimp

    let assemble = (err, mosaic) => {
      let getBuffer = denodeify(mosaic.getBuffer.bind(mosaic))
      this.state.images.forEach((image, i) => {
        mosaic.composite(image, this.state.displays[i].x, this.state.displays[i].y)
      })
      getBuffer('image/jpeg').then((buffer) => Download(buffer, 'result.jpg') )
    }

    let mosaic = new Jimp(this.bounds.x, this.bounds.y, assemble)

  }

  componentWillMount() :void {
    this.getBounds() && this.getDisplayPositions() && this.buildDisplays()
  }


  render(){
    return (
      <div id='displays'>{this.state.children}</div>
    )
  }
}

export default Mosaic
