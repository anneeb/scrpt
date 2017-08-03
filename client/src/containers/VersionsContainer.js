import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import VersionsMenu from '../components/VersionsMenu'
import VersionContainer from '../containers/VersionContainer'
import * as actions from '../actions'

class VersionsContainer extends Component {
  componentWillMount () {
    if (this.props.active !== 0) {
      this.props.setVersion({
        index: 0,
        version: this.props.version
      })
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
    version: state.ScriptReducer.script.versions[0]
  }
}

export default connect(mapStateToProps, actions)(VersionsContainer)
