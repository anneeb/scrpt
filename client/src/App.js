import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './routers/AppRouter'

class App extends Component {
  render () {
    return (
      <Router>
        <AppRouter />
      </Router>
    )
  }
}

export default App;
