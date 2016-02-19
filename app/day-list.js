'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import { notEqual } from './utils';

function getRowData(dataBlob, sectionId, rowId) {
  const setTimes = dataBlob[sectionId].set_times;
  return setTimes.find((setTime) => setTime.id === rowId);
}

function getSectionHeaderData(dataBlob, sectionId) {
  return dataBlob[sectionId];
}

function dataSource(data) {
  data = data || {};
  const ds = new ListView.DataSource({
    getRowData: getRowData,
    // getSectionHeaderData: getSectionHeaderData,
    rowHasChanged: notEqual,
    sectionHeaderHasChanged: notEqual
  });

  const sectionIds = data.map((venue, idx) => idx);
  const rowIds = data.map((venue) => venue.set_times.map((set_time) => set_time.id));

  return { dataSource: ds.cloneWithRowsAndSections(data, sectionIds, rowIds) };
}

function renderRow(rowData, navigator) {
  function goToRow() {
    const routes = navigator.getCurrentRoutes();
    const currentIndex = routes[routes.length - 1].index;

    navigator.push({ name: 'Band', index: currentIndex + 1, title: rowData.band.name, band_id: rowData.band.id });
  }

  return (
    <TouchableHighlight underlayColor='#ccc' onPress={goToRow}>
      <Text style={styles.row}>{rowData.band.name} {rowData.start_time}</Text>
    </TouchableHighlight>
  );
}

function renderSectionHeader(sectionData, sectionId) {
  return <Text style={styles.sectionHeader}>{sectionData.name}</Text>;
}

function renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class DayList extends Component {
  constructor(props) {
    super(props);
    this.state = dataSource(props.dataSource.venues);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => renderRow(rowData, this.props.navigator)}
          renderSectionHeader={renderSectionHeader}
          renderSeparator={renderSeparator}
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
  sectionHeader: {
    backgroundColor: '#d1d2d4',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCCCCC',
  }
});
