import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from '../containers/HomeContainer'
import ScriptsContainer from '../containers/ScriptsContainer'

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomeContainer} />
        <Route path='/scripts/:cuid' render={(props) => <ScriptsContainer {...props} />} />
      </Switch>
    )
  }
}

export default AppRouter
