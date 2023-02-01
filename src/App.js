import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
class App extends Component {
  render() {

    return (
      <Switch>

        <Route exact path="/" render={() => <h1>PALETTE LIST</h1>} />
        <Route exact path="/palette/:id" render={() => <h1>indivIDUAL PALETTE</h1>} />
      </Switch>

      // <div className="Palette-colors">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>


    )
  }
}

export default App;
