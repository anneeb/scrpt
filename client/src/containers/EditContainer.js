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

  componentWillReceiveProps (nextProps) {
    const cuid = nextProps.match.params.cuid
    if (!nextProps.auth[cuid])
      nextProps.history.push(`/scripts/${cuid}`)
  }

  componentWillUnmount () {
    if (this.props.editorState)
      this.createVersion()
  }

  initEditorState = (json) => {
    this.props.setEditorState(EditorState.createWithContent(this.parseContent(json)))
  }

  parseContent = json => {
    return convertFromRaw(JSON.parse(json))
  }

  createVersion = () => {
    const newJson = this.stringifyContent(this.props.editorState.getCurrentContent())
    if (newJson !== this.props.script.versions[0].contentState)
      this.props.createVersion(newJson, this.props.script.cuid)
  }

  stringifyContent = contentState => {
    return JSON.stringify(convertToRaw(contentState))
  }

  // events

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
      return true
    }
    return false
  }

  onTab = event => {
    event.preventDefault()
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(event, this.props.editorState, maxDepth))
  }

  // editor menu

  saveDisabled = () => {
    return this.props.script.versions[0].contentState === this.stringifyContent(this.props.editorState.getCurrentContent())
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

  renderEditor = (editorState) => {
    return (
      <div className='RichEditor-root'>
        <EditMenu
          editorState={editorState}
          onBlockToggle={this.toggleBlockType}
          onInlineToggle={this.toggleInlineStyle}
          saveDisabled={this.saveDisabled()}
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
    )
  }

  render () {
    const editorState = this.props.editorState
    return editorState ? this.renderEditor(editorState) : <div>Loading...</div>
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
