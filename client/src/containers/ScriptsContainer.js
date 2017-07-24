import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import ScriptsMenu from '../components/ScriptsMenu'
import ScriptsRouter from '../routers/ScriptsRouter'

class ScriptContainer extends Component {

  render () {
    return (
      <Container>
        <Route path='/scripts/:cuid' render={(props) => <ScriptsMenu {...props} />} />
        <ScriptsRouter />
      </Container>
    );
  }
}

export default ScriptContainer
