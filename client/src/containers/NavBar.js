import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Container, Header } from 'semantic-ui-react'
import NewScriptModal from '../containers/NewScriptModal'
import LogInModal from '../containers/LogInModal'


class NavBar extends Component {

  renderOption = () => {
    if (this.props.location.pathname === '/') {
      return <NewScriptModal />
    } else {
      const cuid = this.props.location.pathname.split('/')[2]
      return this.props.auth[cuid] ? 'Editing as: NAME' : <LogInModal cuid={cuid} />
    }
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
            {this.renderOption()}
          </Menu.Item>
        </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {return {auth: state.auth}}

export default connect(mapStateToProps)(NavBar)
