import React from 'react-native';

import listStyles from './styles/list-styles';
import utils from './utils';

const Component = React.Component;
const ListView = React.ListView;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity;

const styles = StyleSheet.create(listStyles);

function dataSource(props) {
  const ds = new ListView.DataSource({ rowHasChanged: utils.notEqual });
  return { dataSource: ds.cloneWithRows(props.dataSource || []) };
}

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
    this.state = dataSource(props);
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
