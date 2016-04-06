import React from 'react-native';
import ToggleSetTime from './components/toggle-set-time';

import padding from '../styles/components/padding';
import schedule from '../data/schedule';
import scheduleDecorator from '../decorators/schedule';
import scheduleStyles from '../styles/schedule-styles';
import utils from '../utils';

const Animated = React.Animated;
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
  return <Row rowData={rowData} context={context} />;
}

function renderSectionHeader(sectionData) {
  // function goToSection() {
  //   navigator.push({ name: 'Venue', index: currentIndex(navigator) + 1, title: sectionData.name, venue_id: sectionData.id });
  // }

  return (
    <Text style={styles.sectionHeader}>{sectionData.name}</Text>
  );
}

function renderSeparator(sectionID, rowID) {
  return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
}

class Row extends Component {
  constructor(props) {
    super(props);

    const initHeight = 52;
    this.state = {
      fadeAnim: new Animated.Value(initHeight)
    };
  }

  render() {
    const rowData = this.props.rowData;
    const context = this.props.context;
    const commonPadding = 4;

    function anim(animContext, parent) {
      Animated.timing(
        animContext.state.fadeAnim,
        { toValue: 0, duration: 300 }
      ).start(() => parent.setSchedule());
    }

    return (
      <Animated.View style={[styles.rowContainer, { height: this.state.fadeAnim, overflow: 'hidden' }]}>
        <Text style={[styles.row, styles.setTime]}>{utils.formatDate(rowData.startTime)}</Text>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: commonPadding }}>
          <Text style={[styles.venue]} numberOfLines={1}>{rowData.venue.name}</Text>
          <Text style={[styles.band]} numberOfLines={1}>{rowData.band.name}</Text>
        </View>
        <ToggleSetTime setTime={rowData} style={[styles.row, styles.toggleSetTime]}
        toggleCallback={() => anim(this, context)}/>
      </Animated.View>
    );
  }
}

Row.propTypes = {
  rowData: React.PropTypes.object,
  context: React.PropTypes.object
};

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
      schedule: []
    };

    this.setSchedule();
  }

  setSchedule() {
    schedule.get().then((setTimes) => {
      const decorated = scheduleDecorator(setTimes, this.props.fullSchedule);
      this.setState({ dataSource: dataSource(decorated), schedule: setTimes });
    });
  }

  render() {
    if (!this.state.dataSource) {
      return (
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.message}>Loading...</Text>
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
