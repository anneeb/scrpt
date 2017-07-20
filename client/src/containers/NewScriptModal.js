import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import NewScriptForm from '../components/NewScriptForm'

class NewScriptModal extends Component {
  render () {
    return (
      <Modal trigger={<Button color='green'>+</Button>}>
        <Modal.Header>Create a New Script</Modal.Header>
        <Modal.Content>
          <NewScriptForm />
        </Modal.Content>
      </Modal>
    )
  }
}

export default NewScriptModal
