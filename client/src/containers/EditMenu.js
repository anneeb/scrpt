import React, { Component } from 'react'
import StyleButton from '../components/StyleButton'

const BLOCK_TYPES = [
  {label: 'Act', style: 'act'},
  {label: 'Scene', style: 'scene'},
  {label: 'Character', style: 'character'},
  {label: 'Dialogue', style: 'dialogue'}
]

const INLINE_STYLES = [
  {icon: 'bold', style: 'BOLD'},
  {icon: 'italic', style: 'ITALIC'},
  {icon: 'underline', style: 'UNDERLINE'},
  {icon: 'strikethrough', style: 'STRIKETHROUGH'}
]

class EditMenu extends Component {
  render() {
    const editorState = this.props.editorState
    const currentStyle = editorState.getCurrentInlineStyle()
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={this.props.onBlockToggle}
            style={type.style}
          />
        )}
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            icon={type.icon}
            onToggle={this.props.onInlineToggle}
            style={type.style}
          />
        )}
      </div>
    )
  }
}

export default EditMenu
