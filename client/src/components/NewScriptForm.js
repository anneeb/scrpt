import React, { Component } from 'react'
import { Button, Label } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'

class NewScriptForm extends Component {
  state = {
    title: '',
    editor: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (data) => {
    console.log(data)
  }

  render () {
    return (
      <Form onValidSubmit={this.handleSubmit}>
        <Form.Input
          label='Title'
          name='title'
          placeholder='script title'
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
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
          validations={{ minLength: 6 }}
          validationErrors={{
            minLength: 'Password must be at least 6 characters',
            isDefaultRequiredValue: 'Password is required'
          }}
          errorLabel={ <Label color='red' pointing /> }
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <Form.Input
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          placeholder='script password again'
          validations={{equalsField: 'password'}}
          validationErrors={{
            equalsField: 'Passwords must match',
            isDefaultRequiredValue: 'Password confirmation is required'
          }}
          errorLabel={ <Label color='red' pointing /> }
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          required
        />
        <Button type='submit' color='green'>Submit</Button>
      </Form>
    )
  }
}

export default NewScriptForm
