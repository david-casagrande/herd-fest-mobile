import 'react-native';
import React from 'react';
import HFContainer from '../HFContainer';
import { shallow } from 'enzyme';
import styles from '../../styles/hf-container';

describe('HFContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      style: [{ width: 100 }]
    };
  });

  it('appends style', () => {
    const wrapper = shallow(<HFContainer {...props}>Test</HFContainer>);

    expect(wrapper.prop('style')[1]).toEqual(props.style[0]);
  });

  it('does not append style', () => {
    props.style = null;
    const wrapper = shallow(<HFContainer {...props}>Test</HFContainer>);

    expect(wrapper.prop('style')).toEqual(styles.container);
  });
});
