import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import * as actions from '../actions'

class LogOutDropdown extends Component {
  handleClick = () => {
    this.props.logOut(this.props.cuid)
  }
  
  render () {
    return (
      <Dropdown item trigger={<span>Editing as: <strong>{this.props.name}</strong></span>}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.handleClick}>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default connect(null, actions)(LogOutDropdown)
