import React, { Component } from 'react'
import Pdf from '../components/Pdf'
import '../stylesheets/ScriptContainer.css'

class ScriptContainer extends Component {
  render () {
    return (
      <div className='script-container'>
        <Pdf />
      </div>
    )
  }
}

export default ScriptContainer
