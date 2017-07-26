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
    this.props.checkScriptAuth(this.props.match.params.cuid)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.auth.shouldRedirect) {
      this.props.authRedirectCompleted()
      this.context.router.history.push(`/scripts/${nextProps.script.cuid}/edit`)
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
    console.log(this.props.script)
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
