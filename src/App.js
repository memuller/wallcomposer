//@flow

import React, { Component } from 'react'
import '../public/normalize.css'
import '../public/skeleton.css'
import './App.css'
import Mosaic from './Mosaic'
import ContainerDimensions from 'react-container-dimensions'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <h2>Spanned Wallpaper Builder</h2>
          <p className='section-description'>
            
          </p>
          <span className='buttons'>
            <button>Previous</button>
            <button>Settings</button>
          </span>
        </header>
        <section id='mosaic' className='container'>
          <ContainerDimensions>
            <Mosaic />
          </ContainerDimensions>
        </section>
      </div>
    )
  }
}

export default App;
