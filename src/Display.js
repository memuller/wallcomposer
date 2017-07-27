//@flow
import React, {Component} from 'react'
import './display.css'
import type {BasicDisplay, DisplayProperties, File, Image} from './Common'
import TransformButton from './TransformButton'
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
  onUpdate: (id :number, image :Image) => mixed
}
type State = {
  populated: boolean,
  image?: Image,
  imageData?: string,
  working: boolean
}

class Display extends Component<void, Props, State> {
  props: Props
  state: State

  constructor(props :Props){
    super(props)
    this.state = { populated: false, working: false }
  }

  onDrop(accepted :Array<File>, rejected :Array<File>){
    let file = accepted[0]
    this.receiveImage(file)
  }

  updateImage(image :Image) :void {
    let base64 = denodeify(image.getBase64.bind(image))
    base64('image/jpeg').then((data) => {
        this.setState({image: image, populated: true})
        this.setState({imageData: data })
        this.props.onUpdate(this.props.id, image)
    })
  }

  receiveImage(file :File) :void{
    window.Jimp.read(file.path).then((image) => {
      image.scaleToFit(this.props.display.width, this.props.display.height)
      this.updateImage(image)
    }).catch(err => console.log(err))
  }

  canOperate() :boolean {
    return this.state.populated && ! this.state.working
  }

  blockingOperation(func :Function){
    this.setState({ working: true })
    func.bind(this).call()
    this.setState({ working: false })
  }

  flip(orientation :Array<boolean>){
    if(this.canOperate()){
      this.blockingOperation(() => {
        let image :any = this.state.image
        image.flip(...orientation)
        this.updateImage(image)
      })
    } else {
      console.log('nope')
    }
  }
  flipH() { this.flip([true, false]) }
  flipV() { this.flip([false, true]) }

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
      <div>
      <Dropzone className='display' style={style} onDrop={this.onDrop.bind(this)} disableClick={true} >
          <span className='dimensions'>
            {this.props.width}x{this.props.height}
          </span>
      </Dropzone>
      <span className='transforms'>
        <TransformButton label='FlipH' action={this.flipH.bind(this)}/>
        <TransformButton label='FlipV' action={this.flipV.bind(this)}/>
      </span>
    </div>
    )
  }
}

export default Display
