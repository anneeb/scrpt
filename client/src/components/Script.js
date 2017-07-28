import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import PDFDocument from 'pdfkit'
import blobStream from 'blob-stream'

class Script extends Component {
  state = {
    src: null
  }

  componentWillMount() {
    const doc = new PDFDocument
    const stream = doc.pipe(blobStream())
    doc.text('hello, world')
    doc.end()
    stream.on('finish', function() {
      this.setState({
        src: stream.toBlobURL('application/pdf')
      })
    })
  }

  render() {
    const src = this.state.src
    if (src) {
      return <iframe title='scrpt' src={src} />
    } else {
      return 'loading...'
    }
  }
}

export default Script
