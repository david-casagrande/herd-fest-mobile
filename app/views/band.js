import React from 'react-native';

import bandStyles from '../styles/band-styles';
import lodash from 'lodash';
import serializers from '../data/serializers';
import utils from '../utils';

const Component = React.Component;
const Image = React.Image; // eslint-disable-line no-unused-vars
const ScrollView = React.ScrollView; // eslint-disable-line no-unused-vars
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(bandStyles);

function setTimes(props) {
  const bandSetTimes = utils.findMany(props.fullSchedule.set_times, props.band.set_times);
  return lodash.groupBy(bandSetTimes, 'day');
}

export default class Band extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setTimes: setTimes(props)
    };
  }

  renderSetTimes(setTimesToRender) {
    const serialized = serializers.setTimes(setTimesToRender, this.props.fullSchedule);
    return serialized.map((setTime) => <Text key={setTime.id}>{setTime.startTime} @ {setTime.venue.name}</Text>);
  }

  renderDays() {
    const dayIds = lodash.keys(this.state.setTimes);
    const days = utils.findMany(this.props.fullSchedule.days, dayIds);

    return lodash.sortBy(days, ['date']).map((day) => { // eslint-disable-line arrow-body-style
      return (
        <View key={day.id}>
          <Text>{day.name}</Text>
          {this.renderSetTimes(this.state.setTimes[day.id])}
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
        {this.renderDays()}
      </ScrollView>
    );
  }
}

Band.propTypes = {
  band: React.PropTypes.shape({
    description: React.PropTypes.string,
    image_url: React.PropTypes.string
  }),
  fullSchedule: React.PropTypes.object
};
