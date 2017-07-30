import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pdf from '../components/Pdf'
import '../stylesheets/ScriptContainer.css'

class ScriptContainer extends Component {
  render () {
    return (
      <div className='script-pdf'>
        <Pdf contentState={this.props.contentState}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contentState: state.ScriptReducer.script.versions[0].contentState
  }
}

export default connect(mapStateToProps)(ScriptContainer)
