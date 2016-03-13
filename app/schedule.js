import React from 'react-native';
import ToggleSetTime from './toggle-set-time'; // eslint-disable-line no-unused-vars

import lookup from './data/lookup';
import schedule from './data/schedule';
import scheduleDecorator from './decorators/schedule';
import scheduleStyles from './styles/schedule-styles';
import utils from './utils';

const Animated = React.Animated;
const Component = React.Component;
const ListView = React.ListView;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(scheduleStyles);

function getRowData(dataBlob, sectionId, rowId) {
  const setTimes = dataBlob[sectionId].setTimes;
  return setTimes.find((setTime) => setTime.id === rowId);
}

function dataSource(collection) {
  collection = collection || [];
  const ds = new ListView.DataSource({
    getRowData,
    rowHasChanged: utils.notEqual,
    sectionHeaderHasChanged: utils.notEqual
  });

  const sectionIds = collection.map((day, idx) => idx);
  const rowIds = collection.map((day) => day.setTimes.map((setTime) => setTime.id));

  return ds.cloneWithRowsAndSections(collection, sectionIds, rowIds);
}

function renderRow(rowData, navigator, context) {
  return <Row rowData={rowData} context={context} />;
}

function renderSectionHeader(sectionData, sectionId, navigator) {
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

    this.state = {
      fadeAnim: new Animated.Value(37), // init opacity 0
    };
  }

  render() {
    const rowData = this.props.rowData;
    const context = this.props.context;

    function anim(context, parent) {
      Animated.timing(
        context.state.fadeAnim,
        { toValue: 0, duration: 300 }
      ).start(() => parent.setSchedule());
    }

    return (
      <Animated.View style={[styles.rowContainer, { height: this.state.fadeAnim, overflow: 'hidden' }]}>
        <Text style={[styles.row, styles.setTime]}>{utils.formatDate(rowData.startTime)}</Text>
        <Text style={[styles.row, styles.band]}>{rowData.band.name} @ {rowData.venue.name}</Text>
        <ToggleSetTime setTime={rowData} style={[styles.row, styles.toggleSetTime]}
        toggleCallback={() => anim(this, context)}/>
      </Animated.View>
    );
  }
}

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
    if(!this.state.dataSource) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if(this.state.schedule.length < 1) {
      return (
        <View style={styles.container}>
          <Text>You dont have anything scheduled yet</Text>
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
