import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Input, Button } from 'semantic-ui-react'

class Home extends Component {
  state = {
    input: ''
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (
      <Grid centered textAlign='center' style={{'padding-top': 50}}>
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
            or if you have a script key, enter it here:
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Input
            label='http://scrpt.herokuapp.com/scripts/'
            placeholder='your script key'
            value={this.state.input}
            onChange={this.handleChange}
          />
        </Grid.Row>
        <Grid.Row>
          <Button disabled={!this.state.input} as={Link} exact to={`/scripts/${this.state.input}`} color='green'>
            GO
          </Button>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Home
