import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Container, Header } from 'semantic-ui-react'
import NewScriptModal from '../containers/NewScriptModal'
import LogInModal from '../containers/LogInModal'


class NavBar extends Component {
  renderModal = () => {
    if (this.props.location.pathname === '/')
      return <NewScriptModal />
    if (this.props.script)
      return this.renderScriptModal()
  }

  renderScriptModal = () => {
    const cuid = this.props.location.pathname.split('/')[2]
    const editor = this.props.auth[cuid]
    return editor ? <span>Editing as: <strong>{editor.name}</strong></span> : <LogInModal cuid={cuid} />
  }

  render () {
    return (
      <Menu inverted style={{borderRadius: 0}}>
        <Container>
          <Menu.Item as={Link} to='/'>
            <Header as='h2' inverted>
              scrpt
            </Header>
          </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            {this.renderModal()}
          </Menu.Item>
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
