import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'formsy-semantic-ui-react'
import PropTypes from 'prop-types'
import * as actions from '../actions'

class LogInForm extends Component {
  state = {
    editor: '',
    password: '',
    cuid: this.props.cuid
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = ({ editor, password, cuid }) => {
    this.props.logIn({ editor, password, cuid })
  }

  renderAlert = () => {
    if (this.props.auth.error) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.auth.error}
        </div>
      )
    }
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label='Editor'
          name='editor'
          placeholder='your name'
          value={this.state.editor}
          onChange={this.handleChange}
          required
        />
        <Form.Input
          label='Password'
          type='password'
          name='password'
          placeholder='script password'
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <Form.Input
          type='hidden'
          name='cuid'
          value={this.state.cuid}
        />

        {this.renderAlert()}
        <Form.Button type='submit' color='green'>Log In</Form.Button>
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(LogInForm)
