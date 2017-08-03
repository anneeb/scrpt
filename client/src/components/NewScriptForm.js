import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Label } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'
import PropTypes from 'prop-types'
import * as actions from '../actions'

class NewScriptForm extends Component {
  state = {
    title: '',
    name: '',
    password: '',
    confirmPassword: ''
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillUpdate(nextProps) {
    if (nextProps.shouldRedirect) {
      this.props.authRedirectCompleted()
      this.context.router.history.push(`/scripts/${nextProps.script.cuid}/edit`)
    }
  }

  handleChange = formData => {
    this.setState(formData)
  }

  handleSubmit = formData => {
    this.props.createScript(formData)
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
      <Form onChange={this.handleChange} onValidSubmit={this.handleSubmit}>
        <Form.Input
          label='Title'
          name='title'
          placeholder='script title'
          value={this.state.title}
          required
        />
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
          validations={{ minLength: 6 }}
          validationErrors={{
            minLength: 'Password must be at least 6 characters',
            isDefaultRequiredValue: 'Password is required'
          }}
          errorLabel={ <Label color='red' pointing /> }
          required
        />
        <Form.Input
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          placeholder='script password again'
          value={this.state.confirmPassword}
          validations={{equalsField: 'password'}}
          validationErrors={{
            equalsField: 'Passwords must match',
            isDefaultRequiredValue: 'Password confirmation is required'
          }}
          errorLabel={ <Label color='red' pointing /> }
          required
        />
        {this.renderAlert()}
        <Form.Button type='submit' color='green'>
          Submit
        </Form.Button>
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return {
    error: state.AuthReducer.error,
    script: state.ScriptReducer.script,
    shouldRedirect: state.AuthReducer.shouldRedirect
  }
}

export default connect(mapStateToProps, actions)(NewScriptForm)
