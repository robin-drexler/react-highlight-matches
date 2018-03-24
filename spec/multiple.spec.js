import React from 'react';
import { render } from 'react-testing-library';
import HightlightMatches from '../HighlightMatches';

describe('multiple tags', () => {
  it('surrounds matches with component', () => {
    const text = `Hello <phrase>world</phrase>.
    
    The <phrase>World</phrase> is an awesome place! :) <test>blubb</test>
    <foo>bar</foo>
    `;
    const exptectedText = `Hello world.
    
    The World is an awesome place! :) blubb
    bar
    `;
    const { container } = render(
      <HightlightMatches
        text={text}
        tags={[
          {
            tag: 'phrase',
            Component: 'h1'
          },
          {
            tag: 'test',
            render: ({ text, key }) => <h2 key={key}>{text}</h2>
          },
          {
            tag: 'foo',
            Component: 'h3'
          }
        ]}
      />
    );

    expect(container.querySelectorAll('h1').length).toBe(2);
    expect(container.querySelectorAll('h2').length).toBe(1);
    expect(container.querySelectorAll('h3').length).toBe(1);

    expect(container.querySelectorAll('h1')[0].textContent).toBe('world');
    expect(container.querySelectorAll('h1')[1].textContent).toBe('World');

    expect(container.querySelectorAll('h2')[0].textContent).toBe('blubb');
    expect(container.querySelectorAll('h3')[0].textContent).toBe('bar');

    expect(container.textContent).toBe(exptectedText);
  });

  it('works when nothing matches', () => {
    const text = `Hello <phrase>world</phrase>.
    
    The <phrase>World</phrase> is an awesome place! :)
    `;
    const { container } = render(
      <HightlightMatches text={text} tag="foo" Component={'h1'} />
    );

    expect(container.querySelectorAll('h1').length).toBe(0);
    expect(container.textContent).toBe(text);
  });

  it('surrounds matches with render prop', () => {
    const text = `Hello <phrase>world</phrase>.
    
    The <phrase>World</phrase> is an awesome place! :)
    `;
    const exptectedText = `Hello world.
    
    The World is an awesome place! :)
    `;
    const { container } = render(
      <HightlightMatches
        text={text}
        tag="phrase"
        render={({ text, key }) => {
          return <h1 key={key}>{text}</h1>;
        }}
      />
    );

    expect(container.querySelectorAll('h1').length).toBe(2);
    expect(container.querySelectorAll('h1')[0].textContent).toBe('world');
    expect(container.querySelectorAll('h1')[1].textContent).toBe('World');
    expect(container.textContent).toBe(exptectedText);
  });
});
