import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HighlightMatches extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { tag, Component, text, render } = this.props;
    const matchRegex = new RegExp(`(<${tag}>.*?</${tag}>)`, 'g');
    const replaceRegex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');

    const result = text.split(matchRegex).map((split, i) => {
      if (!split.match(matchRegex)) {
        return split;
      }
      const text = split.replace(replaceRegex, '$1');

      if (typeof render === 'function') {
        return render({ text, key: i });
      }

      return <Component key={i}>{text}</Component>;
    });

    return <span>{result}</span>;
  }
}

HighlightMatches.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  Component: PropTypes.node,
  render: PropTypes.func
};

module.exports = HighlightMatches;
