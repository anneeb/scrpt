import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Header, Input, Form } from 'semantic-ui-react'

class Home extends Component {
  state = {
    input: '',
    redirect: false
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      redirect: true
    })
  }

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/scripts/${this.state.input}`} />
    }
  }

  render() {
    return (
      <Grid centered textAlign='center' style={{paddingTop: 50}} as={Form} onSubmit={this.handleSubmit}>
        {this.redirect()}
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
            <Input
              label='http://scrpt.herokuapp.com/scripts/'
              placeholder='your script key'
              value={this.state.input}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Grid.Row>
        <Grid.Row>
          <Form.Button disabled={!this.state.input} color='green'>
            GO
          </Form.Button>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home
