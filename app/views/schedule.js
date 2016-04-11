import React from 'react-native';
import ScheduleRow from './schedule-row';

import schedule from '../data/schedule';
import scheduleDecorator from '../decorators/schedule';
import scheduleStyles from '../styles/schedule-styles';
import utils from '../utils';

const Component = React.Component;
const ListView = React.ListView;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const View = React.View;

const styles = StyleSheet.create(scheduleStyles);

function getRowData(dataBlob, sectionId, rowId) {
  const setTimes = dataBlob[sectionId].setTimes;
  return setTimes.find((setTime) => setTime.id === rowId);
}

function dataSource(collection) {
  const sectionIds = collection.map((day, idx) => idx);
  const rowIds = collection.map((day) => day.setTimes.map((setTime) => setTime.id));

  return utils.dataSource(collection, { sectionIds, rowIds }, { getRowData });
}

function renderRow(rowData, navigator, context) {
  return <ScheduleRow rowData={rowData} context={context} />;
}

function renderSectionHeader(sectionData) {
  // function goToSection() {
  //   navigator.push({ name: 'Venue', index: utils.currentIndex(navigator) + 1, title: sectionData.name, venue_id: sectionData.id });
  // }

  return (
    <Text style={styles.sectionHeader}>{sectionData.name}</Text>
  );
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
      error: false,
      schedule: []
    };

    this.setSchedule();
  }

  setSchedule() {
    return schedule.get()
      .then((setTimes) => {
        const decorated = scheduleDecorator(setTimes, this.props.fullSchedule);
        this.setState({ dataSource: dataSource(decorated), schedule: setTimes });
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

    return (
      <View style={styles.container}>
        <ListView
          initialListSize={12}
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => renderRow(rowData, this.props.navigator, this)}
          renderSectionHeader={(sectionData, sectionId) => renderSectionHeader(sectionData, sectionId, this.props.navigator)}
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
