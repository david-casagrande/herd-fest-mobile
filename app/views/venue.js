import React from 'react-native';
import SetTimesByDay from './components/set-times-by-day';

import utils from '../utils';
import venueStyles from '../styles/venue-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const ScrollView = React.ScrollView;
const View = React.View;

const styles = StyleSheet.create(venueStyles);

export default class Venue extends Component {
  address() {
    return (
      <View style={styles.venueAddressContainer}>
        <View style={styles.venueAddressFlexContainer}>
          <Text style={styles.venueAddress}>{this.props.venue.street_address}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.address()}
        <ScrollView>
          <SetTimesByDay fullSchedule={this.props.fullSchedule} setTimes={this.props.venue.set_times} showBand={true} />
        </ScrollView>
      </View>
    );
  }
}

Venue.propTypes = {
  venue: React.PropTypes.shape({
    street_address: React.PropTypes.string,
    set_times: React.PropTypes.array
  }),
  fullSchedule: React.PropTypes.object
};
