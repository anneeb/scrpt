import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ScriptsMenu from '../components/ScriptsMenu'
import ScriptsRouter from '../routers/ScriptsRouter'
import * as actions from '../actions/'

class ScriptContainer extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps.auth.shouldRedirect)
    if (nextProps.auth.shouldRedirect) {
      this.props.authCompleted()
      this.context.router.history.push(`/scripts/${nextProps.script.cuid}/edit`)
    }
  }

  render () {
    return (
      <Container>
        <Route path='/scripts/:cuid' render={(props) => <ScriptsMenu {...props} />} />
        <ScriptsRouter />
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return { auth: state.auth, script: state.script }
}

export default connect(mapStateToProps, actions)(ScriptContainer)
