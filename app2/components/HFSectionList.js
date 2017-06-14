import React from 'react';
import PropTypes from 'prop-types';
import { SectionList, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/hf-section-list';

class HFSectionList extends React.Component {
  sectionHeaderStyle() {
    const sectionHeaderStyle = [styles.sectionHeader];

    if (this.props.tintColor) {
      sectionHeaderStyle.push({ backgroundColor: this.props.tintColor });
    }

    return sectionHeaderStyle;
  }

  sectionHeader(info) {
    return (
      <View style={this.sectionHeaderStyle()}>
        <Text style={styles.sectionHeaderText}>
          {this.props.renderSectionHeader(info)}
        </Text>
      </View>
    );
  }

  sectionHeaderTouchable(info) {
    return (
      <TouchableOpacity style={this.sectionHeaderStyle()} onPress={() => this.props.onPress(info.section)}>
        <Text style={styles.sectionHeaderText}>
          {this.props.renderSectionHeader(info)}
        </Text>
      </TouchableOpacity>
    );
  }

  item(info) {
    return (
      <View style={styles.item}>
        {this.props.renderItem(info)}
      </View>
    );
  }

  render() {
    const props = {
      sections: this.props.sections,
      keyExtractor: (item) => item[this.props.keyProp],
      renderItem: (info) => this.item(info),
      renderSectionHeader: (info) => this.props.onPress ? this.sectionHeaderTouchable(info) : this.sectionHeader(info),
      ItemSeparatorComponent: () => <View style={styles.separator} />
    };

    return <SectionList {...props} />;
  }
}

HFSectionList.propTypes = {
  sections: PropTypes.array.isRequired,
  keyProp: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func.isRequired,
  tintColor: PropTypes.string,
  onPress: PropTypes.func
};

export default HFSectionList;
