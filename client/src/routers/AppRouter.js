import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HomeContainer from '../containers/HomeContainer'
import ScriptContainer from '../containers/ScriptContainer'

class AppRouter extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={HomeContainer}/>
        <Route path='/scripts' component={ScriptContainer}/>
      </div>
    );
  }
}

export default AppRouter
