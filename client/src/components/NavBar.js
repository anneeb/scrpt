import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

class NavBar extends Component {
  render() {
    return (
      <Header>
        NavBar
      </Header>
    );
  }
}

const mapStateToProps = (state) => {return {auth: state.auth}}

export default connect(mapStateToProps)(NavBar)
