import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'
import EditMenu from '../containers/EditMenu'
import * as actions from '../actions'
import '../stylesheets/EditContainer.css'
import 'draft-js/dist/Draft.css'

class EditContainer extends Component {

  componentWillMount () {
    const cuid = this.props.match.params.cuid
    if (this.props.auth[cuid])
      this.initEditorState(this.props.script.versions[0].contentState)
    else
      this.props.history.push(`/scripts/${cuid}`)
  }

  componentWillUnmount () {
    const editorState = this.props.editorState
    if (editorState)
      this.createVersion()
  }

  initEditorState = (json) => {
    const editorState = EditorState.createWithContent(this.parseContent(json))
    this.props.setEditorState(editorState)
  }

  createVersion = () => {
    const oldJson = this.props.script.versions[0].contentState
    const newJson = this.stringifyContent(this.props.editorState.getCurrentContent())
    if (newJson !== oldJson)
      this.props.createVersion(newJson, this.props.script.cuid)
  }

  stringifyContent = contentState => {
    return JSON.stringify(convertToRaw(contentState))
  }

  parseContent = json => {
    return convertFromRaw(JSON.parse(json))
  }

  disableSave = () => {
    const oldJson = this.props.script.versions[0].contentState
    const newJson = this.stringifyContent(this.props.editorState.getCurrentContent())
    return oldJson === newJson
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
    const editorState = this.props.editorState
    if (editorState)
      return (
        <div className='RichEditor-root'>
          <EditMenu
            editorState={editorState}
            onBlockToggle={this.toggleBlockType}
            onInlineToggle={this.toggleInlineStyle}
            disableSave={this.disableSave}
            createVersion={this.createVersion}
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
    else
      return (
        <div> Loading... </div>
      )
  }

}

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer,
    script: state.ScriptReducer.script,
    editorState: state.EditReducer.editorState
  }
}

export default connect(mapStateToProps, actions)(EditContainer)
