import React from 'react';
import ReactNative from 'react-native';
import SectionHeader from './components/section-header';
import SetTimeRow from './components/set-time-row';

import dayListStyles from '../styles/day-list-styles';
import utils from '../utils';
import dsSetTimesBy from '../data-sources/set-times-by';

const Component = React.Component;
const ListView = ReactNative.ListView;
const StyleSheet = ReactNative.StyleSheet;
const TouchableOpacity = ReactNative.TouchableOpacity;
const View = ReactNative.View;

const styles = StyleSheet.create(dayListStyles);

function renderRow(rowData, navigator, color) {
  function goToRow() {
    navigator.push({ name: 'Band', index: utils.currentIndex(navigator) + 1, title: rowData.band.name, id: rowData.band.id });
  }

  return (
    <TouchableOpacity onPress={goToRow}>
      <SetTimeRow setTime={rowData} color={color} content={rowData.band.name} />
    </TouchableOpacity>
  );
}

function renderSectionHeader(sectionData, sectionId, navigator, color) {
  function goToSection() {
    navigator.push({ name: 'Venue', index: utils.currentIndex(navigator) + 1, title: sectionData.name, id: sectionData.id });
  }

  return (
    <TouchableOpacity onPress={goToSection}>
      <SectionHeader title={sectionData.name} backgroundColor={color} />
    </TouchableOpacity>
  );
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class DayList extends Component {
  dataSource() {
    const setTimes = utils.findMany(this.props.fullSchedule.set_times, this.props.day.set_times);
    return dsSetTimesBy('venue', setTimes, this.props.fullSchedule);
  }

  render() {
    const color = this.props.color;
    const navigator = this.props.navigator;

    return (
      <View style={[styles.container, { paddingTop: 0 }]}>
        <ListView
          initialListSize={12}
          style={styles.listView}
          dataSource={this.dataSource()}
          renderRow={(rowData) => renderRow(rowData, navigator, color)}
          renderSeparator={renderSeparator}
        />
      </View>
    );

    // return (
    //   <View style={[styles.container, { paddingTop: 0 }]}>
    //     <ListView
    //       initialListSize={12}
    //       style={styles.listView}
    //       dataSource={this.dataSource()}
    //       renderRow={(rowData) => renderRow(rowData, navigator, color)}
    //       renderSectionHeader={(sectionData, sectionId) => renderSectionHeader(sectionData, sectionId, navigator, color)}
    //       renderSeparator={renderSeparator}
    //     />
    //   </View>
    // );
  }
}

DayList.propTypes = {
  day: React.PropTypes.object,
  fullSchedule: React.PropTypes.object,
  navigator: React.PropTypes.object,
  color: React.PropTypes.string
};
