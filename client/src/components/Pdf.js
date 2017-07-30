import React, { Component } from 'react'
import { connect } from 'react-redux'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as actions from '../actions'
import '../stylesheets/Pdf.css'

class Pdf extends Component {

  getPdfUrl = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const docDefinition = { content: this.props.version.contentState }
    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    pdfDocGenerator.getDataUrl(this.setPdfUrl)
  }

  setPdfUrl = dataUrl => {
    const payload = {
      id: this.props.version.id,
      url: dataUrl
    }
    this.props.addPdfUrl(payload)
  }

  render () {
    const url = this.props.version.url
    if (url) {
      return <iframe src={url} title='scrpt'/>
    } else {
      this.getPdfUrl()
      return <div>Loading...</div>
    }
  }
}

export default connect(null, actions)(Pdf)
