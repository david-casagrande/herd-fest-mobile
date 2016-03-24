import React from 'react-native';

import listStyles from '../styles/list-styles';
import utils from '../utils';

const Component = React.Component;
const ListView = React.ListView;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(listStyles);

function renderRow(rowData, sectionID, rowID, context) {
  return (
    <TouchableOpacity style={styles.rowContainer} onPress={() => context.props.goTo(rowData)}>
      <Text style={[styles.row, styles.content]}>{rowData.name}</Text>
    </TouchableOpacity>
  );
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: utils.dataSource(props.dataSource || []) };
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
