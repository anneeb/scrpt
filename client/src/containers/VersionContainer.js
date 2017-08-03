import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Button } from 'semantic-ui-react'
import Pdf from '../components/Pdf'
import * as actions from '../actions'
import '../stylesheets/VersionContainer.css'

class VersionContainer extends Component {

  handleClick = () => {
    this.props.createVersion(this.props.version.contentState, this.props.cuid)
  }

  renderHeader = () => {
    const date = new Date(this.props.version.created_at)
    return (
      <Header
        content={`Created on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`}
        subheader={`Editors: ${this.props.version.editors.map((e) => e.name).join(', ')}`}
      />
    )
  }

  renderButton = () => {
    if (this.props.auth[this.props.cuid])
      return (
        <Button color='green' disabled={this.props.active === 0} onClick={this.handleClick}>
          Revert
        </Button>
      )
  }

  render () {
    return (
      <div className='version-container'>
        <Grid style={{height: '14%'}}>
          <Grid.Column width={12}>
            {this.renderHeader()}
          </Grid.Column>
          <Grid.Column width={4} textAlign='right'>
            {this.renderButton()}
          </Grid.Column>
        </Grid>
        <div className='version-pdf'>
          <Pdf version={this.props.version}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer,
    cuid: state.ScriptReducer.script.cuid,
    active: state.VersionReducer.active,
    version: state.VersionReducer.version
  }
}

export default connect(mapStateToProps, actions)(VersionContainer)
