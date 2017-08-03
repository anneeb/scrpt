import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

class StyleButton extends Component {
  onToggle = event => {
    event.preventDefault()
    this.props.onToggle(this.props.style)
  }

  getClassName = () => {
    let className = 'RichEditor-styleButton'
    return this.props.active ? className + ' RichEditor-activeButton' : className
  }

  renderLabel = () => {
    return this.props.icon ? <Icon name={this.props.icon}/> : this.props.label
  }

  render () {
    return (
      <span className={this.getClassName()} onMouseDown={this.onToggle}>
        {this.renderLabel()}
      </span>
    )
  }
}

export default StyleButton
