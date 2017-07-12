import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from '../styles/hf-container';

function mergeStyleProp(props) {
  const { style } = props;
  const { container } = styles;

  if (!style) {
    return container;
  }

  return [container].concat(style);
}

class HFContainer extends React.Component {
  render() {
    const props = Object.assign({}, this.props);
    delete props.style;

    return <View style={mergeStyleProp(this.props)} {...props} />;
  }
}

HFContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.array
};

export default HFContainer;
