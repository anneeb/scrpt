import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './routers/AppRouter'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <AppRouter />
        </div>
      </Router>
    );
  }
}

export default App;
