import React from 'react-native';
import SectionHeader from './components/section-header';
import SetTimeRow from './components/set-time-row';
import SetTimesByDay from './components/set-times-by-day';

import dsSetTimesBy from '../data-sources/set-times-by';
import lodash from 'lodash';
import venueStyles from '../styles/venue-styles';
import utils from '../utils';

const Component = React.Component;
const ListView = React.ListView;
const ScrollView = React.ScrollView;
const StyleSheet = React.StyleSheet;
const View = React.View;
const TouchableOpacity = React.TouchableOpacity;

const styles = StyleSheet.create(venueStyles);

function renderRow(rowData, navigator, colorMap) {
  function goToRow() {
    navigator.push({ name: 'Band', index: utils.currentIndex(navigator) + 1, title: rowData.band.name, id: rowData.band.id });
  }

  return (
    <TouchableOpacity onPress={goToRow}>
      <SetTimeRow setTime={rowData} color={colorMap[rowData.day.id]} content={rowData.band.name} />
    </TouchableOpacity>
  );
}

function renderSectionHeader(sectionData, sectionId, navigator, colorMap) {
  const backgroundColor = colorMap[sectionData.id];

  return <SectionHeader title={sectionData.name} backgroundColor={backgroundColor} />;
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

export default class Venue extends Component {
  constructor(props) {
    super(props);

    const sorted = lodash.sortBy(props.fullSchedule.days, 'date');

    this.state = {
      colorMap: utils.colorMap(sorted.map((day) => day.id))
    };
  }

  dataSource() {
    const setTimes = utils.findMany(this.props.fullSchedule.set_times, this.props.venue.set_times);

    return dsSetTimesBy('day', setTimes, this.props.fullSchedule);
  }

  render() {
    const colorMap = this.state.colorMap;
    const navigator = this.props.navigator;

    return (
      <View style={styles.container}>
        <ListView
          initialListSize={12}
          style={styles.listView}
          dataSource={this.dataSource()}
          renderRow={(rowData) => renderRow(rowData, navigator, colorMap)}
          renderSectionHeader={(sectionData, sectionId) => renderSectionHeader(sectionData, sectionId, navigator, colorMap)}
          renderSeparator={renderSeparator}
        />
      </View>
    );
  }
}

Venue.propTypes = {
  venue: React.PropTypes.shape({
    set_times: React.PropTypes.array
  }),
  fullSchedule: React.PropTypes.object
};
