import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import VersionsMenu from '../components/VersionsMenu'
import VersionContainer from '../containers/VersionContainer'
import * as actions from '../actions'

class VersionsContainer extends Component {
  componentWillMount () {
    if (this.props.active !== 0) {
      const payload = {
        index: 0,
        version: this.props.versions[0]
      }
      this.props.setVersion(payload)
    }
  }

  render () {
    return (
      <Grid style={{height: '95vh'}}>
        <Grid.Column width={4}>
          <VersionsMenu />
        </Grid.Column>
        <Grid.Column width={12}>
          <VersionContainer />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    active: state.VersionReducer.active,
    versions: state.ScriptReducer.script.versions
  }
}

export default connect(mapStateToProps, actions)(VersionsContainer)
