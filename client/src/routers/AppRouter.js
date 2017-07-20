import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import NavBar from '../containers/NavBar'
import HomeContainer from '../containers/HomeContainer'
import ScriptContainer from '../containers/ScriptContainer'

class AppRouter extends Component {
  render() {
    return (
      <div>
        <Route path='/' render={(props) => <NavBar {...props} />} />
        <Route exact path='/' component={HomeContainer} />
        <Route exact path='/scripts/:cuid' render={(props) => <ScriptContainer {...props} />} />
      </div>
    );
  }
}

export default AppRouter
