import React from 'react';
import './app.css';
import HTMLContainer from './htmlcontainer';
import MarkdownContainer from './markdowncontainer';
import { markdownToHTML } from '../markdown/markdown';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {markdown: '', html: ''};
  }

  componentDidMount() {
    fetch('introduction.txt')
      .then(response => response.text())
      .then(text => this.setState({markdown: text, html: markdownToHTML(text)}));
  }

  onChange = (event) => {
    this.setState({
      markdown: event.target.value,
      html: markdownToHTML(event.target.value)
    })
  };

  render() {
    return (
      <div className='App'>
        <MarkdownContainer
          onChange={this.onChange}
          value={this.state.markdown}
          />
        <HTMLContainer
          value={this.state.html}
          />
      </div>
    );
  }
}

export default App;
