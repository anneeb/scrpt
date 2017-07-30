import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pdf from '../components/Pdf'
import '../stylesheets/ScriptContainer.css'

class ScriptContainer extends Component {
  render () {
    return (
      <div className='script-pdf'>
        <Pdf version={this.props.version}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    version: state.ScriptReducer.script.versions[0]
  }
}

export default connect(mapStateToProps)(ScriptContainer)
