import React from 'react-native';

import listStyles from '../../styles/components/list';

const Component = React.Component;
const View = React.View;
const Text = React.Text;
const StyleSheet = React.StyleSheet;

const styles = StyleSheet.create(listStyles);

export default class SectionHeader extends Component {
  render() {
    const backgroundColor = this.props.backgroundColor;
    const viewStyle = backgroundColor ? [styles.sectionHeader, { backgroundColor }] : styles.sectionHeader;

    return (
      <View style={viewStyle}>
        <Text style={styles.sectionHeaderText}>{this.props.title}</Text>
      </View>
    );
  }
}

SectionHeader.propTypes = {
  backgroundColor: React.PropTypes.string,
  title: React.PropTypes.string
};
