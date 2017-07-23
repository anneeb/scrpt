import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


class ScriptsMenu extends Component {

  renderEdit = () => {
    if (this.props.auth.isLoggedIn) {
      return (
        <Menu.Item as={NavLink} exact to={`/scripts/${this.props.match.params.cuid}/edit`}>
          Edit
        </Menu.Item>
      )
    }
  }

  render () {
    console.log(this.props);
    return (
      <Menu tabular>
        <Menu.Item as={NavLink} exact to={`/scripts/${this.props.match.params.cuid}`}>
          Script
        </Menu.Item>
        <Menu.Item as={NavLink} exact to={`/scripts/${this.props.match.params.cuid}/reports`}>
          Reports
        </Menu.Item>
        <Menu.Item as={NavLink} exact to={`/scripts/${this.props.match.params.cuid}/versions`}>
          Versions
        </Menu.Item>
        {this.renderEdit()}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {return {auth: state.auth}}

export default connect(mapStateToProps)(ScriptsMenu)
