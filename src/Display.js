//@flow
import React, {Component} from 'react'
import './display.css'
import type {BasicDisplay, DisplayProperties, File, Image} from './Common'
import Dropzone from 'react-dropzone'
import 'jimp/browser/lib/jimp'

import Denodeify from 'es6-denodeify'
const denodeify = Denodeify(Promise)

type Props = {
  width: number,
  height: number,
  x: number,
  y: number,
  id: number,
  key?: number,
  position: DisplayProperties,
  display: BasicDisplay,
  onUpdate: any
}
type State = {
  populated: boolean,
  image?: Image,
  imageData?: string
}

class Display extends Component<void, Props, State> {
  props: Props
  state: State

  constructor(props :Props){
    super(props)
    this.state = { populated: false }
  }

  onDrop(accepted :Array<File>, rejected :Array<File>){
    let file = accepted[0]
    this.receiveImage(file)
  }

  receiveImage(file :File) :void{
    window.Jimp.read(file.path).then((image) => {
      image.resize(this.props.display.width, this.props.display.height)
      let base64 = denodeify(image.getBase64.bind(image))
      base64('image/jpeg').then((data) => {
          this.setState({image: image, populated: true})
          this.setState({imageData: data })
          this.props.onUpdate(this.props.id, image)
      })
    }).catch(err => console.log(err))
  }

  render() {
    let style= {
      left: this.props.position.x,
      top: this.props.position.y,
      width: this.props.position.width,
      height: this.props.position.height,
      backgroundImage: `url('${String(this.state.imageData)}')`,
      backgroundSize: 'cover',
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
