import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '../containers/Auth.js'
import ScriptContainer from '../containers/ScriptContainer'
import EditContainer from '../containers/EditContainer'
import ReportsContainer from '../containers/ReportsContainer'
import VersionsContainer from '../containers/VersionsContainer'

class ScriptsRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/scripts/:cuid' component={ScriptContainer} />
        <Route exact path='/scripts/:cuid/edit' component={Auth(EditContainer)} />
        <Route exact path='/scripts/:cuid/reports' component={ReportsContainer} />
        <Route exact path='/scripts/:cuid/versions' component={VersionsContainer} />
      </Switch>
    )
  }
}

export default ScriptsRouter
