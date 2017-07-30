import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import * as actions from '../actions'

class VersionsMenu extends Component {

  handleClick = index => {
    const payload = {
      index: index,
      version: this.props.versions[index]
    }
    this.props.setVersion(payload)
  }

  renderItems = () => {
    return this.props.versions.map((v, i) => {
      const date = new Date(v.created_at)
      const editors = v.editors.map((e) => e.name).join(', ')
      return (
        <Menu.Item key={i} active={this.props.active === i} onClick={() => this.handleClick(i)}>
          <p>
            {date.toLocaleDateString()} - {date.toLocaleTimeString()}
            <br />
            {editors}
          </p>
        </Menu.Item>
      )
    })
  }

  render () {
    return (
      <Menu vertical fluid style={{height: '100%', overflowY: 'scroll'}}>
        {this.renderItems()}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    active: state.VersionReducer.active,
    versions: state.ScriptReducer.script.versions
  }
}

export default connect(mapStateToProps, actions)(VersionsMenu)
