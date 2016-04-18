import React from 'react-native';

import dataErrorStyles from '../styles/data-error-styles';

const Component = React.Component;
const View = React.View;
const Text = React.Text;
const StyleSheet = React.StyleSheet;

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
