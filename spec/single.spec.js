import React from 'react';
import { render } from 'react-testing-library';
import HightlightMatches from '../HighlightMatches';

describe('highlight matches', () => {
  it('surrounds matches with component', () => {
    const text = `Hello <phrase>world</phrase>.
    
    The <phrase>World</phrase> is an awesome place! :)
    `;
    const exptectedText = `Hello world.
    
    The World is an awesome place! :)
    `;
    const { container } = render(
      <HightlightMatches text={text} tag="phrase" Component={'h1'} />
    );

    expect(container.querySelectorAll('h1').length).toBe(2);
    expect(container.querySelectorAll('h1')[0].textContent).toBe('world');
    expect(container.querySelectorAll('h1')[1].textContent).toBe('World');
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
