import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'formsy-semantic-ui-react'
import * as actions from '../actions'

class LogInForm extends Component {
  state = {
    name: '',
    password: '',
    cuid: this.props.cuid
  }

  handleChange = formData => {
    this.setState(formData)
  }

  handleSubmit = formData => {
    this.props.logIn(formData)
  }

  renderAlert = () => {
    const error = this.props.error
    if (error)
      return (
        <div>
          <strong>Oops!</strong> {error}
        </div>
      )
  }

  render () {
    return (
      <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <Form.Input
          label='Editor'
          name='name'
          placeholder='your name'
          value={this.state.name}
          required
        />
        <Form.Input
          label='Password'
          type='password'
          name='password'
          placeholder='script password'
          value={this.state.password}
          required
        />
        <Form.Input
          type='hidden'
          name='cuid'
          value={this.state.cuid}
        />
        {this.renderAlert()}
        <Form.Button type='submit' color='green'>
          Log In
        </Form.Button>
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return { error: state.AuthReducer.error }
}

export default connect(mapStateToProps, actions)(LogInForm)
