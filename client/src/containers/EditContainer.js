import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditMenu from '../containers/EditMenu'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import '../../node_modules/draft-js/dist/Draft.css'
import '../stylesheets/EditContainer.css'
import * as actions from '../actions'

class EditContainer extends Component {

  componentWillMount () {
    const versions = this.props.script.versions
    if (versions) { this.initEditorState(versions) }
  }

  initEditorState = (versions) => {
    const json = versions[0].contentState
    const editorState = EditorState.createWithContent(this.parseContent(json))
    this.props.setEditorState(editorState)
  }

  componentWillUnmount () {
    this.checkForVersions()
  }

  onUnload = (event) => {
    this.checkForVersions()
  }

  checkForVersions = () => {
    const versions = this.props.script.versions
    if (versions) { this.compareVersions(versions) }
  }

  compareVersions (versions) {
    const oldJson = versions[0].contentState
    const newJson = this.stringifyContent(this.props.editorState.getCurrentContent())
    if (newJson !== oldJson) { this.createVersion(newJson) }
  }

  stringifyContent(contentState) {
    return JSON.stringify(convertToRaw(contentState))
  }

  parseContent(json) {
    return convertFromRaw(JSON.parse(json))
  }

  createVersion (json) {
    const cuid = this.props.script.cuid
    this.props.createVersion(json, cuid)
  }

  focus = () => {
    this.refs.editor.focus()
  }

  onChange = (state) => {
    this.props.setEditorState(state)
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true;
    }
    return false;
  }

  onTab = (event) => {
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

  toggleBlockType = (blockType) => {
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

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  render() {
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

function mapStateToProps (state) {
  return { script: state.script, editorState: state.edit.editorState, auth: state.auth }
}

export default connect(mapStateToProps, actions)(EditContainer)
