import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
// import { Editor, EditorState, RichUtils} from 'draft-js'
// import '../../node_modules/draft-js/dist/Draft.css'

class ScriptEditor extends Component {
  render() {
    return (
      <Grid fluid>
        <Grid.Row>
          Menu Goes Here
        </Grid.Row>
        <Grid.Row>
          Editor goes here
        </Grid.Row>
      </Grid>
    )
  }
}

export default ScriptEditor
