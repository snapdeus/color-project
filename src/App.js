import React, { Component } from 'react'
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
class App extends Component {
  render() {

    return (
      <div className='Palette'>
        {/* navbar */}
        <div className="Palette-colors">
          <Palette palette={generatePalette(seedColors[4])} />
        </div>
        {/* footer */}
      </div>
    )
  }
}

export default App;
