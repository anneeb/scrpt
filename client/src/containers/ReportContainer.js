import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pdf from '../components/Pdf'
import '../stylesheets/ReportContainer.css'

class ReportContainer extends Component {

  applyFilters = (blocks) => {
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
          actPush = this.props.filters.acts[++actIdx].show
          sceneIdx = -1
          return actPush ? results.push(block) : true
        case 'scene':
          scenePush = this.props.filters.acts[actIdx].scenes[++sceneIdx].show
          return actPush && scenePush ? results.push(block) : true
        case 'character':
          charPush = this.props.filters.characters[text.toUpperCase()]
          return actPush && scenePush && charPush ? results.push(block) : true
        default:
      }
    })
    return results
  }

  getVersion = () => {
    const oldContentState = JSON.parse(this.props.json)
    const newBlocks = this.applyFilters(oldContentState.blocks)
    const contentState = JSON.stringify({blocks: newBlocks})
    return { contentState }
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
    json: state.ScriptReducer.script.versions[0].contentState
  }
}

export default connect(mapStateToProps)(ReportContainer)
