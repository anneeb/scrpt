import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Container, Header } from 'semantic-ui-react'
import NewScriptModal from '../containers/NewScriptModal'
import LogInModal from '../containers/LogInModal'
import LogOutDropdown from '../components/LogOutDropdown'

class NavBar extends Component {
  renderModal = () => {
    if (this.props.location.pathname === '/')
      return (
        <Menu.Item>
          <NewScriptModal />
        </Menu.Item>
      )
    if (this.props.script)
      return this.renderScriptModal()
  }

  renderScriptModal = () => {
    const cuid = this.props.location.pathname.split('/')[2]
    const editor = this.props.auth[cuid]
    if (editor)
      return <LogOutDropdown name={editor.name} cuid={cuid} />
    return (
      <Menu.Item>
        <LogInModal cuid={cuid} />
      </Menu.Item>
    )
  }

  render () {
    return (
      <Menu inverted style={{borderRadius: 0}}>
        <Container>
          <Menu.Item as={Link} to='/'>
            <Header as='h2' inverted style={{fontFamily: 'Courier New'}}>
              scrpt
            </Header>
          </Menu.Item>
        <Menu.Menu position='right'>
          {this.renderModal()}
        </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer,
    script: state.ScriptReducer.script
  }
}

export default connect(mapStateToProps)(NavBar)
