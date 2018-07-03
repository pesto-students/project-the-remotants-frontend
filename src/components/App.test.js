import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('Rendering element', () =>
it('renders a div', () => {
  const wrapper = shallow(<div />);
  expect(wrapper.length).toBeGreaterThan(0);
}));