import React, { Component } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';




class App extends Component {
  findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id
    })
  }

  render() {

    return (
      <Switch>

        <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />} />
        <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
      </Switch>

      // <div className="Palette-colors">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>


    )
  }
}

export default App;
