import 'react-native';
import React from 'react';
import HFListSeparator from '../HFListSeparator';
import { shallow } from 'enzyme';
import styles from '../../styles/hf-list-separator';

describe('HFListSeparator', () => {
  it('renders View', () => {
    const wrapper = shallow(<HFListSeparator />);

    expect(wrapper.prop('style')).toEqual(styles.separator);
  });
});
