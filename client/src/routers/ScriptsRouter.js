import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ScriptContainer from '../containers/ScriptContainer'

class ScriptsRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/scripts/:cuid/edit' component={ScriptContainer} />
        <Route exact path='/scripts/:cuid/reports' component={ScriptContainer} />
        <Route exact path='/scripts/:cuid/versions' component={ScriptContainer} />
      </Switch>
    )
  }
}

export default ScriptsRouter
