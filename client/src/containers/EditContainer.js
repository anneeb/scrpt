import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditMenu from '../containers/EditMenu'
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import '../../node_modules/draft-js/dist/Draft.css'
import '../stylesheets/EditContainer.css'
import * as actions from '../actions'

class EditContainer extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  // componentWillMount() {
  //   if (this.props.script.versions) {
  //     this.props.getContentState(this.props.script)
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.edit.contentState) {
  //     this.setState
  //   }
  // }

  focus = () => {
    this.refs.editor.focus()
  }

  // componentWillUpdate(nextProps, nextState) {
  //   const thisContext = this.props.contentState
  //   const nextContext = nextProps.contentState
  //   if (thisContext && nextContext && thisContext !== nextContext) {
  //     console.log('here')
  //   }
  // }

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
        this.state.editorState,
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
        this.state.editorState,
        inlineStyle
      )
    );
  }

  componentWillUnmount() {
    console.log('um')
  }

  render() {
    // if (this.props.contentState) {
      // const editorState = EditorState.createWithContent(convertFromRaw(this.props.contentState))
      // const selectionState = this.state.editorState.getSelection()
      // const editorState = EditorState.acceptSelection(propsEditor, selectionState)
      const editorState = this.state.editorState
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
    // } else {
      // return (
        // <div> Loading... </div>
      // )
    // }
  }

}

function mapStateToProps (state) {
  return { contentState: state.edit.contentState, script: state.script }
}

export default connect(mapStateToProps, actions)(EditContainer)
