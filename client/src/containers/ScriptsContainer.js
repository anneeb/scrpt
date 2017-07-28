import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import ScriptsMenu from '../components/ScriptsMenu'
import ScriptsRouter from '../routers/ScriptsRouter'
import * as actions from '../actions/'

class ScriptContainer extends Component {

  componentWillMount() {
    console.log('checking auth', this.props.location.pathname.split('/')[3] === 'edit')
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
    if (this.props.script.error) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.script.error}
        </div>
      )
    }
  }

  render () {
    console.log('rendering scripts');
    return (
      <Container >
        {this.renderAlert()}
        <Header content={this.props.script.title} subheader={this.props.script.cuid} />
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
