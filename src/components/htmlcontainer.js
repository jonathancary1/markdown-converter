import PropTypes from 'prop-types';
import React from 'react';
import './htmlcontainer.css';

class HTMLContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isPreview: true};
  }

  onClick = (event) => {
    this.setState({isPreview: !this.state.isPreview});
  }

  render() {
    if (this.state.isPreview) {
      return (
        <div id='html-column'>
          <div id='html-header'>
            <div id='html-header-title'>HTML</div>
            <button id='html-header-button' onClick={this.onClick}>
              {'</>'}
            </button>
          </div>
          <div
            id='html-preview'
            dangerouslySetInnerHTML={{__html: this.props.value}}
            />
        </div>
      );
    } else {
      return (
        <div id='html-column'>
          <div id='html-header'>
            <div id='html-header-title'>HTML</div>
            <button id='html-header-button' onClick={this.onClick}>
              Preview
            </button>
          </div>
          <div id='html-code'>{this.props.value}</div>
        </div>
      );
    }
  }
}

HTMLContainer.propTypes = {
  value: PropTypes.string.isRequired
};

export default HTMLContainer;
