import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pdf from '../components/Pdf'
import '../stylesheets/ReportContainer.css'

class ReportContainer extends Component {

  parseFilters = () => {
    let filters = {
      acts: this.props.filters.acts,
      characters: {}
    }
    this.props.filters.characters.forEach(char => filters.characters[char.name] = char.show)
    return filters
  }

  applyFilters = (blocks, filters) => {
    let results = []
    let actPush = true
    let scenePush = true
    let charPush = true
    let actIdx = -1
    let sceneIdx = -1
    blocks.forEach(block => {
      const text = block.text
      const type = block.type
      if (!text || type === 'dialogue' || type === 'unstyled')
        return actPush && scenePush && charPush ? results.push(block) : true
      switch (type) {
        case 'act':
          actPush = filters.acts[++actIdx].show
          sceneIdx = -1
          return actPush ? results.push(block) : true
        case 'scene':
          scenePush = filters.acts[actIdx].scenes[++sceneIdx].show
          return actPush && scenePush ? results.push(block) : true
        case 'character':
          charPush = filters.characters[text.toUpperCase()]
          return actPush && scenePush && charPush ? results.push(block) : true
        default:
      }
    })
    return results
  }

  getVersion = () => {
    const contentState = JSON.parse(this.props.version.contentState)
    const newBlocks = this.applyFilters(contentState.blocks, this.parseFilters())
    const newContentState = JSON.stringify({blocks: newBlocks})
    return {contentState: newContentState}
  }

  render () {
    return (
      <div className='report-pdf'>
        <Pdf reportVersion={this.getVersion()} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filters: state.ReportReducer.filters,
    version: state.ScriptReducer.script.versions[0]
  }
}

export default connect(mapStateToProps)(ReportContainer)
