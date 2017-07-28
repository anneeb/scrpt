import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
  class Auth extends Component {
    render () {
      const cuid = this.props.match.params.cuid
      return this.props.auth[cuid] ? <ComposedComponent /> : <Redirect to={`/scripts/${cuid}`} />
    }
  }

  const mapStateToProps = state => {
    return { auth: state.AuthReducer }
  }

  return connect(mapStateToProps)(Auth)
}
