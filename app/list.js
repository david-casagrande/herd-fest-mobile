'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import { fullSchedule } from './server';

function dataSource(props) {
  const data = props.dataSource || [];
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return { dataSource: ds.cloneWithRows(data) };
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    // backgroundColor: '#ccc'
  }
});
