//@flow
import React, {Component} from 'react'
import './display.css'
import type {BasicDisplay, DisplayProperties, File, Image} from './Common'
import Dropzone from 'react-dropzone'
import 'jimp/browser/lib/jimp'

type Props = {
  width: Number,
  height: Number,
  x: Number,
  y: Number,
  key?: Number,
  position: DisplayProperties,
  display :BasicDisplay
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
        .getBase64('image/jpeg', (err, data) => {
          this.setState({image: image})
          this.setState({imageData: data })
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
