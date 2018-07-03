import React from 'react';
import { shallow } from 'enzyme';

describe('Rendering element', () => {
  it('renders a div', () => {
    const wrapper = shallow(<div />);
    expect(wrapper.length).toBeGreaterThan(0);
  });
});
