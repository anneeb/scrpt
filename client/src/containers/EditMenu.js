import React, { Component } from 'react'
import StyleButton from '../components/StyleButton'

const BLOCK_TYPES = [
  {label: 'Act', style: 'act'},
  {label: 'Scene', style: 'scene'},
  {label: 'Character', style: 'character'},
]

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Strikethrough', style: 'STRIKETHROUGH'}
]

class EditMenu extends Component {
  constructor(props) {
    super(props)
    this.currentStyle = props.editorState.getCurrentInlineStyle()
    this.editorState = props.editorState
    this.selection = this.editorState.getSelection()
    this.blockType = this.editorState
      .getCurrentContent()
      .getBlockForKey(this.selection.getStartKey())
      .getType()
  }

  render() {
    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === this.blockType}
            label={type.label}
            onToggle={this.props.onBlockToggle}
            style={type.style}
          />
        )}
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={this.currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.props.onInlineToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
}

export default EditMenu
