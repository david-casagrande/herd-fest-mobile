import React from 'react-native';

import bandStyles from '../styles/band-styles';
import lodash from 'lodash';
import lookup from '../data/lookup';

const Component = React.Component;
const Image = React.Image; // eslint-disable-line no-unused-vars
const ScrollView = React.ScrollView; // eslint-disable-line no-unused-vars
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(bandStyles);

function setTimes(props) {
  const bandSetTimes = lookup.getMany(props.fullSchedule.set_times, props.band.set_times);
  return lodash.groupBy(bandSetTimes, 'day');
}

export default class Band extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimes: setTimes(this.props)
    };
  }

  setTimes() {
    const days = lodash.keys(this.state.setTimes);
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
          source={{ uri: this.props.band.image_url }}
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
