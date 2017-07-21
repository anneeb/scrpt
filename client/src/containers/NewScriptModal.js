import React, { Component } from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'
import NewScriptForm from '../components/NewScriptForm'

class NewScriptModal extends Component {
  render () {
    return (
      <Modal trigger={
        <Button inverted color='green'>
          <Icon name='add'/>
          New
        </Button>
      }>
        <Modal.Header>Create a New Script</Modal.Header>
        <Modal.Content>
          <NewScriptForm />
        </Modal.Content>
      </Modal>
    )
  }
}

export default NewScriptModal
