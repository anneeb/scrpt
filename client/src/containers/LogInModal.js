import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import LogInForm from '../components/LogInForm'

class EditorModal extends Component {
  render () {
    return (
      <Modal trigger={<Button color='green'>Edit</Button>}>
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
          <LogInForm />
        </Modal.Content>
      </Modal>
    )
  }
}

export default EditorModal
