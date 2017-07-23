import React, { Component } from 'react'
import EditMenu from '../containers/EditMenu'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import '../../node_modules/draft-js/dist/Draft.css'
import '../stylesheets/EditContainer.css'

class EditContainer extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  focus = () => {
    this.refs.editor.focus()
  }

  onChange = (state) => {
    this.setState({
      editorState: state
    })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true;
    }
    return false;
  }

  onTab = (event) => {
    event.preventDefault()
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(event, this.state.editorState, maxDepth));
  }

  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  styleMap = {
    STRIKETHROUGH: {
      textDecoration: 'line-through'
    }
  }

  getBlockStyle = (block) => {
    const Switch = {
      act: 'RichEditor-act',
      scene: 'RichEditor-scene',
      character: 'RichEditor-character'
    }
    return Switch[block.getType()] || null
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    // console.log(convertToRaw(contentState: contentState)); // Editor state as JS object
    return (
      <div className='RichEditor-root'>
        <EditMenu
          editorState={editorState}
          onBlockToggle={this.toggleBlockType}
          onInlineToggle={this.toggleInlineStyle}
        />
        <div className='RichEditor-container'>
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={this.getBlockStyle}
              customStyleMap={this.styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditContainer
