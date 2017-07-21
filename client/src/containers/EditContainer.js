import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import ScriptEditor from '../components/ScriptEditor'

class EditContainer extends Component {
  render () {
    return (
      <div>
        <ScriptEditor />
      </div>
    );
  }
}

export default EditContainer
