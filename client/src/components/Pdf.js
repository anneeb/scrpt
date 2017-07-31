import React, { Component } from 'react'
import { connect } from 'react-redux'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as actions from '../actions'
import '../stylesheets/Pdf.css'

class Pdf extends Component {

  getPdfUrl = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const docDefinition = this.defineDoc()
    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    pdfDocGenerator.getDataUrl(this.setPdfUrl)
  }

  defineDoc = () => {
    return {
      pageSize: 'LETTER',
      pageMargins: 1,
      content: this.parseContent(),
      defaultStyle: {
        font: ,
        fontSize: 12
      }
      styles: {
        base: {
          font:
        }
        act: {
          fontSize: 22,
          bold: true
        },
        anotherStyle: {
          italic: true,
          alignment: 'right'
        }
      }
    }
  }

  parseContent = () => {
    const contentState = JSON.parse(this.props.version.contentState)
    return contentState.blocks.map(this.parseBlock)
  }

  parseBlock = b => {
    return  { text: b.text, style: b.type}
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
    if (url)
      return <iframe src={url} title='scrpt'/>
    else {
      this.getPdfUrl()
      return <div>Loading...</div>
    }
  }
}

export default connect(null, actions)(Pdf)
