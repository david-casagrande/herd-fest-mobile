import React from 'react';
import { shallow } from 'enzyme';
import HFHeaderTitle from '../HFHeaderTitle';

describe('HFHeaderTitle', () => {
  let props = null;

  beforeEach(() => {
    props = {
      title: 'Title',
      sub: 'Sub'
    };
  });

  it('renders label and sub', () => {
    const wrapper = shallow(<HFHeaderTitle {...props} />);
    const text = wrapper.find('Text');

    expect(text.at(0).prop('children')).toEqual('Sub');
    expect(text.at(1).prop('children')).toEqual('Title');
  });
});
