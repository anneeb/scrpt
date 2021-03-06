import React, { Component } from 'react'
import { connect } from 'react-redux'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as actions from '../actions'
import '../stylesheets/Pdf.css'

class Pdf extends Component {

  fonts = {
    Courier: {
      normal: 'Courier New.ttf',
      bold: 'Courier New Bold.ttf',
      italics: 'Courier New Italic.ttf',
      bolditalics: 'Courier New Bold Italic.ttf'
    }
  }

  defaultStyle = {
    font: 'Courier',
    fontSize: 12
  }

  styles = {
    act: {
      alignment: 'center',
      decoration: 'underline',
      margin: [0, 24, 0, 0]
    },
    scene: {
      alignment: 'center',
      decoration: 'underline',
      margin: [0, 18, 0, 0]
    },
    character: {
      margin: [0, 12, 0, 0]
    },
    dialogue: {
      margin: [36, 6, 36, 0]
    }
  }

  upcaseStyles = {
    act: true,
    character: true
  }

  inlineStyles = {
    'BOLD': {bold: true},
    'ITALIC': {italics: true},
    'STRIKETHROUGH': {decoration: 'lineThrough'}
  }

  getPdfUrl = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    pdfMake.fonts = this.fonts
    const pdfDocGenerator = pdfMake.createPdf(this.defineDoc())
    pdfDocGenerator.getDataUrl(this.setPdfUrl)
  }

  defineDoc = () => {
    return {
      info: {
      	title: this.props.title,
      	author: this.props.authors
      },
      pageSize: 'LETTER',
      pageMargins: 72,
      content: this.parseContent(),
      defaultStyle: this.defaultStyle,
      styles: this.styles
    }
  }

  parseContent = () => {
    const report = this.props.reportVersion
    const json = report ? report.contentState : this.props.version.contentState
    return JSON.parse(json).blocks.map(this.parseBlock)
  }

  parseBlock = block => {
    const style = block.type
    let text = block.text
    if (!text)
      return {
        text: '\n',
        style
      }
    text = this.upcaseStyles[style] ? text.toUpperCase() : text
    const inlineRanges = block.inlineStyleRanges
    text = !inlineRanges.length ? text : this.inlineTextArray(inlineRanges, text)
    return { text, style }
  }

  inlineTextArray = (inlineRanges, text) => {
    return this.createTextArray(text.split(''), this.createInlineMap(inlineRanges))
  }

  createInlineMap = inlineRanges => {
    let inlines = {}
    inlineRanges.forEach(range => {
      const offset = range.offset
      const style = range.style
      for (let i = 0; i < range.length; i++) {
        inlines[offset + i] = {
          ...inlines[offset + i],
          ...this.inlineStyles[style]
        }
      }
    })
    return inlines
  }

  createTextArray = (characters, inlineMap) => {
    return characters.map((text, i) => {
      return { text, ...inlineMap[i] }
    })
  }

  setPdfUrl = url => {
    if (this.props.reportVersion)
      this.props.addReportUrl(url)
    else
      this.props.addPdfUrl({
        id: this.props.version.id,
        url
      })
  }

  render () {
    const url = this.props.reportVersion ? this.props.reportUrl : this.props.version.url
    if (url)
      return <iframe src={url} title='scrpt'/>
    else {
      this.getPdfUrl()
      return <div>Loading...</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    title: state.ScriptReducer.script.title,
    authors: state.ScriptReducer.script.editors.map(e => e.name).join(', '),
    reportUrl: state.ReportReducer.url
  }
}

export default connect(mapStateToProps, actions)(Pdf)
