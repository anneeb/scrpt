import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import ScriptsRouter from '../routers/ScriptsRouter'

class ScriptContainer extends Component {
  render () {
    return (
      <Container>
        <h1> Script </h1>
        <ScriptsRouter />
      </Container>
    );
  }
}

export default ScriptContainer
