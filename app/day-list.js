import React from 'react-native';
import ToggleSetTime from './toggle-set-time'; // eslint-disable-line no-unused-vars

import dayListDecorator from './decorators/day-list';
import dayListStyles from './styles/day-list-styles';
import utils from './utils';

const Component = React.Component;
const ListView = React.ListView;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(dayListStyles);

function getRowData(dataBlob, sectionId, rowId) {
  const setTimes = dataBlob[sectionId].setTimes;
  return setTimes.find((setTime) => setTime.id === rowId);
}

// function getSectionHeaderData(dataBlob, sectionId) {
//   return dataBlob[sectionId];
// }

function dataSource(collection) {
  collection = collection || {};
  const ds = new ListView.DataSource({
    getRowData,
    // getSectionHeaderData: getSectionHeaderData,
    rowHasChanged: utils.notEqual,
    sectionHeaderHasChanged: utils.notEqual
  });

  const sectionIds = collection.map((venue, idx) => idx);
  const rowIds = collection.map((venue) => venue.setTimes.map((setTime) => setTime.id));

  return { dataSource: ds.cloneWithRowsAndSections(collection, sectionIds, rowIds) };
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
    <TouchableOpacity underlayColor={'#ccc'} onPress={goToRow}>
      <View style={styles.rowContainer}>
        <Text style={[styles.row, styles.setTime]}>{utils.formatDate(rowData.startTime)}</Text>
        <Text style={[styles.row, styles.band]}>{rowData.band.name}</Text>
        <ToggleSetTime setTime={rowData} style={[styles.row, styles.toggleSetTime]} />
      </View>
    </TouchableOpacity>
  );
}

function renderSectionHeader(sectionData, sectionId, navigator) {
  function goToSection() {
    navigator.push({ name: 'Venue', index: currentIndex(navigator) + 1, title: sectionData.name, venue_id: sectionData.id });
  }

  return (
    <TouchableOpacity underlayColor={'#ccc'} onPress={goToSection}>
      <Text style={styles.sectionHeader}>{sectionData.name}</Text>
    </TouchableOpacity>
  );
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class DayList extends Component {
  constructor(props) {
    super(props);

    const day = dayListDecorator(props.day, props.fullSchedule);
    this.state = dataSource(day.venues);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => renderRow(rowData, this.props.navigator)}
          renderSectionHeader={(sectionData, sectionId) => renderSectionHeader(sectionData, sectionId, this.props.navigator)}
          renderSeparator={renderSeparator}
        />
      </View>
    );
  }
}
