import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import VersionsMenu from '../components/VersionsMenu'
import VersionContainer from '../containers/VersionContainer'

class VersionsContainer extends Component {
  render () {
    return (
      <Grid style={{height: '95vh'}}>
        <Grid.Column width={3}>
          <VersionsMenu />
        </Grid.Column>
        <Grid.Column width={13}>
          <VersionContainer />
        </Grid.Column>
      </Grid>
    )
  }
}

export default VersionsContainer
