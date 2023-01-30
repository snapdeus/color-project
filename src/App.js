import React, { Component } from 'react'
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
class App extends Component {
  render() {
    console.log(generatePalette(seedColors[4]))
    return (
      <div className='Palette'>
        {/* navbar */}
        <div className="Palette-colors">
          <Palette {...seedColors[4]} />
        </div>
        {/* footer */}
      </div>
    )
  }
}

export default App;
