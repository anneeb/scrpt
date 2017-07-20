import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import NewScriptModal from '../containers/NewScriptModal'


class NavBar extends Component {

  render () {
    return (
      <Menu inverted>
        <Container>
          <Menu.Item as={Link} to='/'>
            scrpt
          </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            {this.props.auth.isLoggedIn ? 'Editing as: NAME' : <NewScriptModal />}
          </Menu.Item>
        </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {return {auth: state.auth}}

export default connect(mapStateToProps)(NavBar)
