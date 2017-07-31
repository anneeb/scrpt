import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import StyleButton from '../components/StyleButton'

class EditMenu extends Component {
  blockTypes = [
    {label: 'Act', style: 'act'},
    {label: 'Scene', style: 'scene'},
    {label: 'Character', style: 'character'},
    {label: 'Dialogue', style: 'dialogue'}
  ]

  inlineStyles = [
    {icon: 'bold', style: 'BOLD'},
    {icon: 'italic', style: 'ITALIC'},
    {icon: 'strikethrough', style: 'STRIKETHROUGH'}
  ]

  renderSave() {
    if (this.props.disableSave())
      return <Button compact positive disabled>Saved!</Button>
    else
      return <Button compact positive onClick={this.props.createVersion}>Save</Button>
  }

  render () {
    const editorState = this.props.editorState
    const currentStyle = editorState.getCurrentInlineStyle()
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return (
      <div className="RichEditor-controls">
        {this.blockTypes.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={this.props.onBlockToggle}
            style={type.style}
          />
        )}
        {this.inlineStyles.map(type =>
          <StyleButton
            key={type.icon}
            active={currentStyle.has(type.style)}
            icon={type.icon}
            onToggle={this.props.onInlineToggle}
            style={type.style}
          />
        )}
        {this.renderSave()}
      </div>
    )
  }
}

export default EditMenu
