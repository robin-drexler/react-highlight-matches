import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HighlightMatches extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      tag,
      component,
      text,
      render,
      tags = [{ tag, component, render }],
      containerComponent: ContainerComponent = 'span'
    } = this.props;

    // first, we need to create a regex that will split by all tags
    // it is needed, because we only can operate on the array once
    // otherwise the order could get messed up
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

      const { component: Component, render, tag } = matchingTag;
      const replaceRegex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');
      const text = split.replace(replaceRegex, '$1');

      if (typeof render === 'function') {
        return render({ text, key: i });
      }

      return <Component key={i}>{text}</Component>;
    });

    return <ContainerComponent>{result}</ContainerComponent>;
  }
}

HighlightMatches.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      component: PropTypes.any,
      render: PropTypes.func
    })
  ),
  component: PropTypes.any,
  render: PropTypes.func
};

module.exports = HighlightMatches;
