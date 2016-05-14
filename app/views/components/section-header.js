import React from 'react';
import ReactNative from 'react-native';

import listStyles from '../../styles/components/list';

const Component = React.Component;
const View = ReactNative.View;
const Text = ReactNative.Text;
const StyleSheet = ReactNative.StyleSheet;

const styles = StyleSheet.create(listStyles);

export default class SectionHeader extends Component {
  render() {
    const backgroundColor = this.props.backgroundColor;
    const viewStyle = backgroundColor ? [styles.sectionHeader, { backgroundColor }] : styles.sectionHeader;

    return (
      <View style={viewStyle}>
        <Text style={styles.sectionHeaderText} numberOfLines={2}>{this.props.title}</Text>
      </View>
    );
  }
}

SectionHeader.propTypes = {
  backgroundColor: React.PropTypes.string,
  title: React.PropTypes.string
};
