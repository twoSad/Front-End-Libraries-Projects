import React from 'react';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Navibar from './Components/Navibar/Navibar'
import QuoteContainer from './Components/RandomQuote/QuoteContainer'
import MarkdownContainer from './Components/MarkdownPreviewer/MarkdownContainer'
import DrumMachineContainer from './Components/DrumMachine/DrumMachineComponent'
import Calculator from './Components/Calculator/CalculatorContainer'

function App() {
  return (
    <div>
      <Router>
      <Navibar />
        <Route exact path='/' />
        <Route path='/RandomQuote' render={() => <QuoteContainer />} />
        <Route path='/MarkdownPreviewer' render={() => <MarkdownContainer />} />
        <Route path='/DrumMachine' render={()=> <DrumMachineContainer />} />
        <Route path='/Calculator' render={()=> <Calculator />} />
      </Router>
    </div>
  )
}

export default App;