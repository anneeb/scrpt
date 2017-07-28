import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import ScriptsRouter from '../routers/ScriptsRouter'
import * as actions from '../actions/'

class ScriptContainer extends Component {
  componentWillMount() {
    if (this.props.location.pathname.split('/')[3] === 'edit') {
      this.props.checkScriptAuthWithRedirect(this.props.match.params.cuid)
    } else {
      this.props.checkScriptAuth(this.props.match.params.cuid)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.auth.shouldRedirect) {
      this.props.authRedirectCompleted()
      this.props.history.push(`/scripts/${nextProps.script.cuid}/edit`)
    }
  }

  renderAlert = () => {
    const error = this.props.error
    if (error) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {error}
        </div>
      )
    }
  }

  renderScript = () => {
    const script = this.props.script
    if (script) {
      return (
        <div>
          <Header content={script.title} subheader={script.cuid} />
          <ScriptsRouter />
        </div>
      )
    }
  }

  render () {
    return (
      <Container >
        {this.renderAlert()}
        {this.renderScript()}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer,
    error: state.ScriptReducer.error,
    script: state.ScriptReducer.script
  }
}

export default connect(mapStateToProps, actions)(ScriptContainer)
