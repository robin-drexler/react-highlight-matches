const React = require('React');
const { mount } = require('enzyme');
const HightlightMatches = require('../HighlightMatches');

describe('highlight matches', () => {
  it('surrounds matches with component', () => {
    const text = `Hello <phrase>world</phrase>.
    
    The <phrase>World</phrase> is an awesome place! :)
    `;
    const exptectedText = `Hello world.
    
    The World is an awesome place! :)
    `;
    const rendered = mount(
      <HightlightMatches
        text={text}
        tag="phrase"
        SurroundWithComponent={'h1'}
      />
    );

    expect(rendered.find('h1').length).toBe(2);
    expect(rendered.find('h1').at(0).text()).toBe('world');
    expect(rendered.find('h1').at(1).text()).toBe('World');
    expect(rendered.text()).toBe(exptectedText);
  });

  it('works when nothing matches', () => {
    const text = `Hello <phrase>world</phrase>.
    
    The <phrase>World</phrase> is an awesome place! :)
    `;
    const rendered = mount(
      <HightlightMatches text={text} tag="foo" SurroundWithComponent={'h1'} />
    );

    expect(rendered.find('h1').length).toBe(0);
    expect(rendered.text()).toBe(text);
  });
});
