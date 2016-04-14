import React from 'react-native';
import SetTimesByDay from './components/set-times-by-day';

import venueStyles from '../styles/venue-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const ScrollView = React.ScrollView;
const View = React.View;

const styles = StyleSheet.create(venueStyles);

export default class Venue extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SetTimesByDay fullSchedule={this.props.fullSchedule} setTimes={this.props.venue.set_times} showBand={true} />
        </ScrollView>
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
