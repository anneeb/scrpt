import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../containers/NavBar'
import HomeContainer from '../containers/HomeContainer'
import ScriptsContainer from '../containers/ScriptsContainer'

class AppRouter extends Component {
  render () {
    return (
      <div>
        <Route path='/' component={NavBar} />
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/scripts/:cuid' component={ScriptsContainer} />
        </Switch>
      </div>
    )
  }
}

export default AppRouter
