import React from 'react-native';
import ToggleSetTime from './components/toggle-set-time'; // eslint-disable-line no-unused-vars

import dayListDecorator from '../decorators/day-list';
import dayListStyles from '../styles/day-list-styles';
import utils from '../utils';

const Component = React.Component;
const ListView = React.ListView; // eslint-disable-line no-unused-vars
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
  const sectionIds = collection.map((venue, idx) => idx);
  const rowIds = collection.map((venue) => venue.setTimes.map((setTime) => setTime.id));

  return utils.dataSource(collection, { sectionIds, rowIds }, { getRowData });
}

function renderRow(rowData, navigator) {
  function goToRow() {
    navigator.push({ name: 'Band', index: utils.currentIndex(navigator) + 1, title: rowData.band.name, id: rowData.band.id });
  }

  return (
    <TouchableOpacity onPress={goToRow}>
      <View style={styles.rowContainer}>
        <Text style={[styles.row, styles.setTime]}>{utils.formatDate(rowData.startTime)}</Text>
        <Text style={[styles.row, styles.content]}>{rowData.band.name}</Text>
        <ToggleSetTime setTime={rowData} style={[styles.row, styles.toggleSetTime]} />
      </View>
    </TouchableOpacity>
  );
}

function renderSectionHeader(sectionData, sectionId, navigator) {
  function goToSection() {
    navigator.push({ name: 'Venue', index: utils.currentIndex(navigator) + 1, title: sectionData.name, id: sectionData.id });
  }

  return (
    <TouchableOpacity onPress={goToSection}>
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
    this.state = { dataSource: dataSource(day.venues) };
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

DayList.propTypes = {
  day: React.PropTypes.object,
  fullSchedule: React.PropTypes.object,
  navigator: React.PropTypes.instanceOf(React.Navigator)
};
