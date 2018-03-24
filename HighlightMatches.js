import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HighlightMatches extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      tag,
      Component,
      text,
      render,
      tags = [{ tag, Component, render }]
    } = this.props;

    const tagStrings = tags.map(({ tag }) => tag).join('|');
    const matchRegex = new RegExp(
      `(<(?:${tagStrings})>.*?</(?:${tagStrings})>)`,
      'g'
    );

    const result = text.split(matchRegex).map((split, i) => {
      const matchingTag = tags.find(({ tag }) => {
        const matchRegex = new RegExp(`(<${tag}>.*?</${tag}>)`, 'g');
        return Boolean(split.match(matchRegex));
      });

      if (!matchingTag) {
        return split;
      }

      const { Component, render, tag } = matchingTag;
      const replaceRegex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');
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
  tag: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      Component: PropTypes.any,
      render: PropTypes.func
    })
  ),
  Component: PropTypes.any,
  render: PropTypes.func
};

module.exports = HighlightMatches;
