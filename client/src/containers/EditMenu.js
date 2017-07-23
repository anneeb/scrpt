import React, { Component } from 'react'
import StyleButton from '../components/StyleButton'


const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
]

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
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
