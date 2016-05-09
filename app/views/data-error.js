import React from 'react';
import ReactNative from 'react-native';

import dataErrorStyles from '../styles/data-error-styles';

const Component = React.Component;
const View = ReactNative.View;
const Text = ReactNative.Text;
const StyleSheet = ReactNative.StyleSheet;

const styles = StyleSheet.create(dataErrorStyles);

export default class DataError extends Component {
  render() {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.message}>💩</Text>
      </View>
    );
  }
}
