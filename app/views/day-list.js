import React from 'react-native';
import ToggleSetTime from './components/toggle-set-time';

import dayListDecorator from '../decorators/day-list';
import dayListStyles from '../styles/day-list-styles';
import utils from '../utils';

const Component = React.Component;
const ListView = React.ListView;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;

const styles = StyleSheet.create(dayListStyles);

function getRowData(dataBlob, sectionId, rowId) {
  const setTimes = dataBlob[sectionId].setTimes;
  return setTimes.find((setTime) => setTime.id === rowId);
}

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
        <Text style={[styles.row, styles.content]} numberOfLines={1}>{rowData.band.name}</Text>
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
  dataSource() {
    const day = dayListDecorator(this.props.day, this.props.fullSchedule);
    return dataSource(day.venues);
  }

  render() {
    return (
      <View style={[styles.container, { paddingTop: 0 }]}>
        <ListView
          initialListSize={12}
          style={styles.listView}
          dataSource={this.dataSource()}
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
  navigator: React.PropTypes.object
};
