//@flow

import React, { Component } from 'react'
import '../public/normalize.css'
import '../public/skeleton.css'
import './App.css'
import Mosaic from './Mosaic'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <h2>Spanned Wallpaper Builder</h2>
          <span className='buttons'>
            <button>Previous</button>
            <button>Settings</button>
          </span>
        </header>
        <section id='mosaic' className='container'>
          <Mosaic />
        </section>
      </div>
    )
  }
}

export default App;
