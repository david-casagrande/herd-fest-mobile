import React from 'react';
import ReactNative from 'react-native';
import ScheduleRow from './schedule-row';
import SectionHeader from './components/section-header';

import lodash from 'lodash';
import schedule from '../data/schedule';
import scheduleStyles from '../styles/schedule-styles';
import utils from '../utils';
import dsSetTimesBy from '../data-sources/set-times-by';

const Component = React.Component;
const ListView = ReactNative.ListView;
const StyleSheet = ReactNative.StyleSheet;
const Text = ReactNative.Text;
const TouchableOpacity = ReactNative.TouchableOpacity;
const View = ReactNative.View;

const styles = StyleSheet.create(scheduleStyles);

function renderRow(rowData, navigator, context, colorMap) {
  function goToRow() {
    navigator.push({ name: 'Venue', index: utils.currentIndex(navigator) + 1, title: rowData.venue.name, id: rowData.venue.id });
  }

  return (
    <TouchableOpacity onPress={goToRow}>
      <ScheduleRow rowData={rowData} context={context} color={colorMap[rowData.day.id]} />
    </TouchableOpacity>
  );
}

function renderSectionHeader(sectionData, sectionId, navigator, colorMap) {
  return <SectionHeader title={sectionData.name} backgroundColor={colorMap[sectionData.id]} />;
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

function filterSetTimes(setTimes, fullSchedule) {
  return lodash.filter(setTimes, (id) => lodash.find(fullSchedule.set_times, { id }));
}

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    const sorted = lodash.sortBy(props.fullSchedule.days, 'date');

    this.state = {
      dataSource: null,
      error: false,
      schedule: [],
      colorMap: utils.colorMap(sorted.map((day) => day.id))
    };

    this.setSchedule();
  }

  setSchedule() {
    return schedule.get()
      .then((setTimes) => {
        const filtered = filterSetTimes(setTimes, this.props.fullSchedule);
        const allSetTimes = utils.findMany(this.props.fullSchedule.set_times, filtered);

        this.setState({ dataSource: dsSetTimesBy('day', allSetTimes, this.props.fullSchedule), schedule: allSetTimes });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    if (!this.state.dataSource) {
      const message = this.state.error ? '💩' : 'Loading...';

      return (
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.message}>{message}</Text>
        </View>
      );
    }

    if (this.state.schedule.length < 1) {
      return (
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.message}>Your schedule is a blank slate.</Text>
        </View>
      );
    }

    const colorMap = this.state.colorMap;
    const navigator = this.props.navigator;

    return (
      <View style={styles.container}>
        <ListView
          initialListSize={12}
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => renderRow(rowData, navigator, this, colorMap)}
          renderSectionHeader={(sectionData, sectionId) => renderSectionHeader(sectionData, sectionId, navigator, colorMap)}
          renderSeparator={renderSeparator}
        />
      </View>
    );
  }
}

Schedule.propTypes = {
  fullSchedule: React.PropTypes.object,
  navigator: React.PropTypes.object,
  route: React.PropTypes.object
};
