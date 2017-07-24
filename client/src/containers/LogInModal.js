import React, { Component } from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'
import LogInForm from '../components/LogInForm'

class LogInModal extends Component {
  render () {
    return (
      <Modal trigger={
        <Button inverted color='green'>
          <Icon name='write'/>
          Edit
        </Button>
      }>
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
          <LogInForm {...this.props} />
        </Modal.Content>
      </Modal>
    )
  }
}

export default LogInModal
