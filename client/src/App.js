import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './containers/NavBar'
import AppRouter from './routers/AppRouter'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' render={(props) => <NavBar {...props} />} />
          <AppRouter />
        </div>
      </Router>
    );
  }
}

export default App;
