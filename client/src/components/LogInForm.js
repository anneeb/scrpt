import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import * as actions from '../../actions'

class LogInForm extends Component {
  state = {
    editor: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    console.log(event)
    this.props.logIn(event)
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
        <Form.Button type='submit' color='green'>Log In</Form.Button>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(LogInForm)
