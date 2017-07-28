import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      const cuid = this.props.match.params.cuid
      if (!this.props.auth[cuid]) {
        this.props.history.push(`/scripts/${cuid}`)
      }
    }

    componentWillUpdate(nextProps) {
      const cuid = this.props.match.params.cuid
      if (!nextProps.auth[cuid]) {
        this.props.history.push(`/scripts/${cuid}`)
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth }
  }

  return connect(mapStateToProps)(Authentication)
}
