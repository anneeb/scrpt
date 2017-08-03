import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Accordion, Icon, Checkbox } from 'semantic-ui-react'
import * as actions from '../actions'

class ReportsMenu extends Component {

  componentWillUnmount() {
    let filters = { ...this.props.filters }
    filters.acts.forEach(act => {
      act.show = true
      act.scenes.forEach(scene => scene.show = true)
    })
    let characters = filters.characters
    Object.keys(characters).forEach(name => characters[name] = true)
    this.props.setFilters({
      id: this.props.id,
      filters: filters
    })
  }

  toggleAllScenes = (aIdx, allShow) => {
    let filters = { ...this.props.filters }
    let act = filters.acts[aIdx]
    act.show = allShow
    act.scenes.forEach(s => s.show = allShow)
    this.props.setFilters({
      id: this.props.id,
      filters: filters
    })
  }

  toggleScene = (sIdx, aIdx, show) => {
    let filters = { ...this.props.filters }
    let act = filters.acts[aIdx]
    act.scenes[sIdx].show = show
    act.show = act.scenes.some(s => s.show)
    this.props.setFilters({
      id: this.props.id,
      filters: filters
    })
  }

  toggleAllCharacters = (allShow) => {
    let filters = { ...this.props.filters }
    let characters = filters.characters
    Object.keys(characters).forEach(name => characters[name] = allShow)
    this.props.setFilters({
      id: this.props.id,
      filters: filters
    })
  }

  toggleCharacter = (name, show) => {
    let filters = { ...this.props.filters }
    filters.characters[name] = show
    this.props.setFilters({
      id: this.props.id,
      filters: filters
    })
  }

  renderActs = () => {
    return this.props.filters.acts.map((act, aIdx) => {
      const allShow = !act.scenes.some(scene => !scene.show)
      const checkboxes = act.scenes.map((scene, sIdx) => {
        const show = scene.show
        return (
          <Checkbox
            as={Menu.Item}
            key={sIdx}
            label={`${aIdx + 1}.${sIdx + 1} - ${scene.title}`}
            checked={show}
            onClick={() => this.toggleScene(sIdx, aIdx, !show)}
          />
        )
      })
      return (
        <Accordion as={Menu.Item} key={aIdx}>
          <Accordion.Title>
            <Icon name='dropdown' />
            {`${aIdx + 1}. ${act.title}`}
          </Accordion.Title>
          <Accordion.Content>
            <Checkbox
              as={Menu.Item}
              label='ALL'
              checked={allShow}
              onClick={() => this.toggleAllScenes(aIdx, !allShow)}
            />
            {checkboxes}
          </Accordion.Content>
        </Accordion>
      )
    })
  }

  renderCharacters = () => {
    const characters = this.props.filters.characters
    const names = Object.keys(characters)
    if (names.length) {
      const allShow = !names.some(name => !characters[name])
      const checkboxes = names.sort().map((name, i) => {
        const show = characters[name]
        return (
          <Checkbox
            as={Menu.Item}
            key={i}
            label={name}
            checked={show}
            onClick={() => this.toggleCharacter(name, !show)}
          />
        )
      })
      return (
        <Accordion as={Menu.Item}>
          <Accordion.Title>
            <Icon name='dropdown' />
            Characters
          </Accordion.Title>
          <Accordion.Content>
            <Checkbox
              as={Menu.Item}
              label='ALL'
              checked={allShow}
              onClick={() => this.toggleAllCharacters(!allShow)}
            />
            {checkboxes}
          </Accordion.Content>
        </Accordion>
      )
    }
  }

  render () {
    return (
        <Menu vertical fluid style={{height: '100%', overflowY: 'scroll'}}>
          {this.renderActs()}
          {this.renderCharacters()}
        </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    id: state.ReportReducer.id,
    filters: state.ReportReducer.filters
  }
}

export default connect(mapStateToProps, actions)(ReportsMenu)
