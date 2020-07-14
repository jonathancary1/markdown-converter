import PropTypes from 'prop-types';
import React from 'react';
import './markdowncontainer.css';

class MarkdownContainer extends React.Component {
  render() {
    return (
      <div id='markdown-column'>
        <div id='markdown-header'>
          <div id='markdown-header-title'>
            Markdown
          </div>
        </div>
        <textarea
          id='markdown-textarea'
          onChange={this.props.onChange}
          spellCheck='false'
          value={this.props.value}
          />
      </div>
    );
  }
}

MarkdownContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default MarkdownContainer;
