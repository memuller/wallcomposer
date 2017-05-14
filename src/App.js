//@flow

import React, { Component } from 'react'
import '../public/normalize.css'
import '../public/skeleton.css'
import './App.css'
import Mosaic from './Mosaic'
import type {Message} from './Common'
import ContainerDimensions from 'react-container-dimensions'

type State = {
  message: Message
}

type Props = {}

class App extends Component {
  state :State
  props :Props

  constructor(){
    super()
    this.state = {
      message: { kind: 'info', text: 'Drag and drop images to their corresponding monitors.'}
    }
  }

  message(kind :string, text :string){
    this.setState({ message: {kind, text} })
  }

  notImplemented(){
    this.message('error', 'Not implemented')
  }

  render() {
    return (
      <div className="app">
        <header>
          <h2>Spanned Wallpaper Builder</h2>
          <p className='section-description'>

          </p>
          <span className='buttons'>
            <button onClick={this.notImplemented.bind(this)}>Previous</button>
            <button onClick={this.notImplemented.bind(this)}>Settings</button>
          </span>
        </header>
        <section id='messages'>
          <span className={this.state.message.kind}>{this.state.message.text}</span>
        </section>
        <section id='mosaic' className='container'>
          <ContainerDimensions>
            <Mosaic
              onMessage={this.message.bind(this)}
            />
          </ContainerDimensions>
        </section>
      </div>
    )
  }
}

export default App;
