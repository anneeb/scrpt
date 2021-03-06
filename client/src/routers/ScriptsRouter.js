import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ScriptsMenu from '../components/ScriptsMenu'
import ScriptContainer from '../containers/ScriptContainer'
import ReportsContainer from '../containers/ReportsContainer'
import VersionsContainer from '../containers/VersionsContainer'
import EditContainer from '../containers/EditContainer'

class ScriptsRouter extends Component {
  render () {
    return (
      <div>
        <Route path='/scripts/:cuid' component={ScriptsMenu} />
        <Switch>
          <Route exact path='/scripts/:cuid' component={ScriptContainer} />
          <Route exact path='/scripts/:cuid/reports' component={ReportsContainer} />
          <Route exact path='/scripts/:cuid/versions' component={VersionsContainer} />
          <Route exact path='/scripts/:cuid/edit' component={EditContainer} />
          <Route path='/scripts/:cuid/reports' render={p => <Redirect to={`/scripts/${p.match.params.cuid}/reports`} />} />
          <Route path='/scripts/:cuid/versions' render={p => <Redirect to={`/scripts/${p.match.params.cuid}/versions`} />} />
          <Route path='/scripts/:cuid/edit' render={p => <Redirect to={`/scripts/${p.match.params.cuid}/edit`} />} />
          <Route path='/scripts/:cuid' render={p => <Redirect to={`/scripts/${p.match.params.cuid}`} />} />
        </Switch>
      </div>
    )
  }
}

export default ScriptsRouter
