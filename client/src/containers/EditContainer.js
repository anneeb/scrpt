import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'
import EditMenu from '../containers/EditMenu'
import * as actions from '../actions'
import '../stylesheets/EditContainer.css'

class EditContainer extends Component {

  componentWillMount () {
    this.initEditorState(this.props.script.versions[0].contentState)
  }

  initEditorState = (json) => {
    const editorState = EditorState.createWithContent(this.parseContent(json))
    this.props.setEditorState(editorState)
  }

  componentWillUnmount () {
    this.compareVersions(this.props.script.versions[0].contentState)
  }

  compareVersions = oldJson => {
    const newJson = this.stringifyContent(this.props.editorState.getCurrentContent())
    if (newJson !== oldJson)
      this.createVersion(newJson)
  }

  stringifyContent = contentState => {
    return JSON.stringify(convertToRaw(contentState))
  }

  parseContent = json => {
    return convertFromRaw(JSON.parse(json))
  }

  createVersion = json => {
    this.props.createVersion(json, this.props.script.cuid)
  }

  focus = () => {
    this.refs.editor.focus()
  }

  onChange = state => {
    this.props.setEditorState(state)
  }

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true;
    }
    return false;
  }

  onTab = event => {
    event.preventDefault()
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(event, this.props.editorState, maxDepth));
  }

  // block styles

  getBlockStyle = (block) => {
    const Switch = {
      act: 'RichEditor-act',
      scene: 'RichEditor-scene',
      character: 'RichEditor-character',
      dialogue: 'RichEditor-dialogue'
    }
    return Switch[block.getType()] || null
  }

  toggleBlockType = blockType => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    )
  }

  // inline styles

  styleMap = {
    STRIKETHROUGH: {
      textDecoration: 'line-through'
    }
  }

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  render () {
    console.log('rendering edit')
    const editorState = this.props.editorState
    if (editorState) {
      return (
        <div className='RichEditor-root'>
          <EditMenu
            editorState={editorState}
            onBlockToggle={this.toggleBlockType}
            onInlineToggle={this.toggleInlineStyle}
          />
          <div className='RichEditor-container'>
            <div className='RichEditor-editor' onClick={this.focus}>
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
    } else {
      return (
        <div> Loading... </div>
      )
    }
  }

}

const mapStateToProps = state => {
  return {
    script: state.ScriptReducer.script,
    editorState: state.EditReducer.editorState
  }
}

export default connect(mapStateToProps, actions)(EditContainer)
