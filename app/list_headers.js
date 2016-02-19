'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

function changed(l, r) {
  return l !== r;
}

function dataSource(props) {
  const data = props.dataSource || {};
  const ds = new ListView.DataSource({
    getSectionData: (x, y, z) => console.log(x, y, z),
    rowHasChanged: changed,
    sectionHeaderHasChanged: changed
  });
  // getSectionData          : getSectionData,
  // getRowData              : getRowData,
  return { dataSource: ds.cloneWithRowsAndSections(data) };
}

export default class ListHeaders extends Component {
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
          renderRow={(rowData) => { console.log(sectionData, sectionId); <Text>{rowData.name}</Text>}}
          renderSectionHeader={(sectionData, sectionId) => { console.log(sectionData, sectionId); return <Text>{sectionData.name}</Text>; }}
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
