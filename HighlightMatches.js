import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class HighlightMatches extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { tag, SurroundWithComponent, text } = this.props;
    const matchRegex = new RegExp(`(<${tag}>.*?</${tag}>)`, 'g');
    const replaceRegex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');

    const result = text.split(matchRegex).map((split, i) => {
      if (!split.match(matchRegex)) {
        return split;
      }

      return (
        <SurroundWithComponent key={i}>
          {split.replace(replaceRegex, '$1')}
        </SurroundWithComponent>
      );
    });

    return <span>{result}</span>;
  }
}

HighlightMatches.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  SurroundWithComponent: PropTypes.node.isRequired
};

module.exports = HighlightMatches;
