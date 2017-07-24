import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//This is a higher order component to authorize a user
export default function(ComposedComponent) {
  //use the context property to access the router history
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      console.log(this.props)
      const cuid = this.props.match.params.cuid
      if (!this.props.auth[cuid]) {
        this.context.router.history.push(`/scripts/${cuid}`)
      }
    }

    componentWillUpdate(nextProps) {
      console.log(this.props)
      const cuid = this.props.match.params.cuid
      if (!nextProps.auth[cuid]) {
        this.context.router.history.push(`/scripts/${cuid}`)
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
