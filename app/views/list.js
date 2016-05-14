import React from 'react';
import ReactNative from 'react-native';

import listStyles from '../styles/list-styles';
import utils from '../utils';

const Component = React.Component;
const ListView = ReactNative.ListView;
const StyleSheet = ReactNative.StyleSheet;
const Text = ReactNative.Text;
const View = ReactNative.View;
const TouchableOpacity = ReactNative.TouchableOpacity;

const styles = StyleSheet.create(listStyles);

function renderRow(rowData, sectionID, rowID, context) {
  return (
    <TouchableOpacity onPress={() => context.props.goTo(rowData)}>
      <View style={styles.column}>
        <View style={styles.columnContainer}>
          <Text numberOfLines={1} style={[styles.row, styles.text]}>{rowData.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: utils.dataSource(props.dataSource) };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => renderRow(rowData, sectionID, rowID, this)}
          renderSeparator={renderSeparator}
        />
      </View>
    );
  }
}

List.propTypes = {
  dataSource: React.PropTypes.array.isRequired,
  goTo: React.PropTypes.func
};
