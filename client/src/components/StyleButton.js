import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

class StyleButton extends Component {
  onToggle = (event) => {
    event.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active)
      className += ' RichEditor-activeButton'
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.icon ? <Icon name={this.props.icon}/> : this.props.label}
      </span>
    );
  }
}

export default StyleButton
