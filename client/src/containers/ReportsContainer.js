import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ReportsMenu from '../components/ReportsMenu'
import ReportContainer from '../containers/ReportContainer'
import * as actions from '../actions'

class ReportsContainer extends Component {

  getFilters = () => {
    const contentState = JSON.parse(this.props.version.contentState)
    let filters = {
      acts: [],
      characters: []
    }
    contentState.blocks.forEach(block => {
      const text = block.text
      if (!text)
        return
      switch (block.type) {
        case 'act':
          filters.acts.push({
            title: text.toUpperCase(),
            scenes: [],
            show: true
          })
          break
        case 'scene':
          let act = filters.acts[filters.acts.length - 1]
          const scene = {
            title: text,
            show: true
          }
          act ? act.scenes.push(scene) : filters.acts.push({scenes: [scene]})
          break
        case 'character':
          let characters = filters.characters
          const character = {
            name: text.toUpperCase(),
            show: true
          }
          if (!characters.filter(char => char.name === character.name).length)
            characters.push(character)
          break
        default:
      }
    })
    this.props.setFilters({
      id: this.props.version.id,
      filters: filters
    })
  }

  renderMenu = () => {
    if (this.props.version.id !== this.props.id) {
      this.getFilters()
    } else {
      return <ReportsMenu />
    }
  }

  renderReport = () => {
    if (this.props.filters && this.props.version.id === this.props.id)
      return <ReportContainer />
    else
      return 'Loading...'
  }

  render () {
    return (
      <Grid style={{height: '95vh'}}>
        <Grid.Column width={4}>
          {this.renderMenu()}
        </Grid.Column>
        <Grid.Column width={12}>
          {this.renderReport()}
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    version: state.ScriptReducer.script.versions[0],
    id: state.ReportReducer.id,
    filters: state.ReportReducer.filters
  }
}

export default connect(mapStateToProps, actions)(ReportsContainer)
