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
    const docDefinition = this.defineDoc()
    const pdfDocGenerator = pdfMake.createPdf(docDefinition)
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
    const contentState = JSON.parse(this.props.version.contentState)
    return contentState.blocks.map(this.parseBlock)
  }

  parseBlock = block => {
    const style = block.type
    const text = this.upcaseStyles[style] ? block.text.toUpperCase() : block.text
    const inlineRanges = block.inlineStyleRanges
    return {
      text: !inlineRanges.length ? text : this.inlineTextArray(inlineRanges, text),
      style: style
    }
  }

  inlineTextArray = (inlineRanges, text) => {
    const inlineMap = this.createInlineMap(inlineRanges)
    const characters = text.split('')
    return this.createTextArray(characters, inlineMap)
  }

  createInlineMap = inlineRanges => {
    let inlines = {}
    inlineRanges.forEach(obj => {
      const offset = obj.offset
      for (let i = 0; i < obj.length; i++) {
        inlines[offset + i] = {
          ...inlines[offset + i],
          ...this.inlineStyles[obj.style]
        }
      }
    })
    return inlines
  }

  createTextArray = (characters, inlineMap) => {
    return characters.map((char, i) => {
      return { text: char, ...inlineMap[i] }
    })
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

const mapStateToProps = state => {
  return {
    title: state.ScriptReducer.script.title,
    authors: state.ScriptReducer.script.editors.map(e => e.name).join(', ')
  }
}

export default connect(mapStateToProps, actions)(Pdf)
