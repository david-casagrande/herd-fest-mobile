import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import listStyles from './styles/list-styles';
import utils from './utils';

const styles = StyleSheet.create(listStyles);

function dataSource(props) {
  const ds = new ListView.DataSource({ rowHasChanged: utils.notEqual });
  return { dataSource: ds.cloneWithRows(props.dataSource || []) };
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
          renderRow={(rowData) => <Text>{rowData.name}</Text>}
        />
      </View>
    );
  }
}
