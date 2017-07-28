import React, { Component } from 'react'
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import '../stylesheets/Pdf.css'

class Pdf extends Component {
  state = {
    url: null
  }
  
  componentWillMount () {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const docDefinition = { content: 'This is an sample PDF printed with pdfMake' }
    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
    pdfDocGenerator.getDataUrl((dataUrl) => {
      this.setState({
        url: dataUrl
      })
    })
  }

  render () {
    const url = this.state.url
    return url ?  <iframe src={url} /> : <div>loading...</div>
  }
}

export default Pdf
