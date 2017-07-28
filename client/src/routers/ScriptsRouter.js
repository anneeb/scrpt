import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ScriptsMenu from '../components/ScriptsMenu'
import ScriptContainer from '../containers/ScriptContainer'
import ReportsContainer from '../containers/ReportsContainer'
import VersionsContainer from '../containers/VersionsContainer'
import EditContainer from '../containers/EditContainer'
import Auth from '../containers/Auth'

class ScriptsRouter extends Component {
  render () {
    return (
      <div>
        <Route path='/scripts/:cuid' component={ScriptsMenu} />
        <Switch>
          <Route exact path='/scripts/:cuid' component={ScriptContainer} />
          <Route exact path='/scripts/:cuid/reports' component={ReportsContainer} />
          <Route exact path='/scripts/:cuid/versions' component={VersionsContainer} />
          <Route exact path='/scripts/:cuid/edit' component={Auth(EditContainer)} />
        </Switch>
      </div>
    )
  }
}

export default ScriptsRouter
