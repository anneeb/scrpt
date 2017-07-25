import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ScriptsMenu from '../components/ScriptsMenu'
import ScriptsRouter from '../routers/ScriptsRouter'
import * as actions from '../actions/'

class ScriptContainer extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.getScript(this.props.match.params.cuid)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.auth.shouldRedirect) {
      this.props.authCompleted()
      this.context.router.history.push(`/scripts/${nextProps.script.cuid}/edit`)
    }
  }

  render () {
    return (
      <Container>
        <Header>
          {this.props.script.title}
        </Header>
        <ScriptsMenu {...this.props} />
        <ScriptsRouter />
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return { auth: state.auth, script: state.script }
}

export default connect(mapStateToProps, actions)(ScriptContainer)
