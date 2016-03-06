'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import utils from './utils';
import dayListDecorator from './decorators/day-list';

function getRowData(dataBlob, sectionId, rowId) {
  const setTimes = dataBlob[sectionId].setTimes;
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
    rowHasChanged: utils.notEqual,
    sectionHeaderHasChanged: utils.notEqual
  });

  const sectionIds = data.map((venue, idx) => idx);
  const rowIds = data.map((venue) => venue.setTimes.map((setTime) => setTime.id));

  return { dataSource: ds.cloneWithRowsAndSections(data, sectionIds, rowIds) };
}

function currentIndex(navigator) {
  const routes = navigator.getCurrentRoutes();
  return routes[routes.length - 1].index;
}

function renderRow(rowData, navigator) {
  function goToRow() {
    navigator.push({ name: 'Band', index: currentIndex(navigator) + 1, title: rowData.band.name, band_id: rowData.band.id });
  }

  return (
    <TouchableHighlight underlayColor='#ccc' onPress={goToRow}>
      <View style={styles.rowContainer}>
        <Text style={[styles.row, styles.setTime]}>{utils.formatDate(rowData.startTime)}</Text>
        <Text style={styles.row}>{rowData.band.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

function renderSectionHeader(sectionData, sectionId, navigator) {
  function goToSection() {
    navigator.push({ name: 'Venue', index: currentIndex(navigator) + 1, title: sectionData.name, venue_id: sectionData.id });
  }

  return (
    <TouchableHighlight underlayColor='#ccc' onPress={goToSection}>
      <Text style={styles.sectionHeader}>{sectionData.name}</Text>
    </TouchableHighlight>
  );
}

function renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class DayList extends Component {
  constructor(props) {
    super(props);

    const data = dayListDecorator(props.day, props.fullSchedule);
    this.state = dataSource(data.venues);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => renderRow(rowData, this.props.navigator)}
          renderSectionHeader={(sectionData, sectionId) => {
            return renderSectionHeader(sectionData, sectionId, this.props.navigator);
          }}
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
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  setTime: {
    backgroundColor: 'red',
    width: 74,
    color: 'white'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCCCCC',
  }
});
