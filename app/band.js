import React, {
  Component,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import bandStyles from './styles/band-styles';
import lookup from './data/lookup';
import utils from './utils';

const styles = StyleSheet.create(bandStyles);

function setTimes(props) {
  const bandSetTimes = lookup.getMany(props.fullSchedule.set_times, props.band.set_times);
  return utils.groupBy(bandSetTimes, 'day');
}

export default class Band extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimes: setTimes(this.props)
    };
  }

  setTimes() {
    const days = Object.keys(this.state.setTimes);
    return days.map((dayId) => {
      const day = lookup.getOne(this.props.fullSchedule.days, dayId);
      const setTimesToRender = this.state.setTimes[dayId];
      const venues = this.props.fullSchedule.venues;

      function renderSetTimes() {
        return setTimesToRender.map((setTime) => {
          const venue = lookup.getOne(venues, setTime.venue);
          return <Text key={setTime.id}>{setTime.start_time} @ {venue.name}</Text>;
        });
      }

      return (
        <View key={day.id}>
          <Text>{day.name}</Text>
          {renderSetTimes()}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{uri: this.props.band.image_url}}
          style={styles.image}
          resizeMode={'cover'}
        />
        <Text>Bio: {this.props.band.description}</Text>
        <Text style={styles.welcome}>Playing On</Text>
        {this.setTimes()}
      </ScrollView>
    );
  }
}
