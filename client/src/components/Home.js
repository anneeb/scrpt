import React, { Component } from 'react'
import { Grid, Header, Input } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react'
import PropTypes from 'prop-types'

class Home extends Component {
  state = {
    cuid: ''
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleChange = event => {
    this.setState({
      cuid: event.target.value
    })
  }

  handleSubmit = formData => {
    this.context.router.history.push(`/scripts/${formData.cuid}`)
  }

  render () {
    return (
      <Grid as={Form} onSubmit={this.handleSubmit} style={{paddingTop: 50}} centered textAlign='center'>
        <Grid.Row>
          <Header as='h1'>
            Welcome to Scrpt!
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Header as='h2'>
            Create a script by clicking on the button in the top right corner
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Header as='h3'>
            or if you have a script key, paste it here:
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Form.Field inline>
            <Form.Input as={Input}
              label='http://scrpt.herokuapp.com/scripts/'
              name='cuid'
              placeholder='your script key'
              value={this.state.cuid}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Grid.Row>
        <Grid.Row>
          <Form.Button disabled={!this.state.cuid} color='green'>
            GO
          </Form.Button>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home
