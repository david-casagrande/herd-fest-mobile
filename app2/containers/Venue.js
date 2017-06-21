import React from 'react';
import PropTypes from 'prop-types';
import VenueView from '../views/Venue';
import { find } from 'lodash';
import { findMany, setTimesBy } from '../utils';

class VenueContainer extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params;
    const venue = find(this.props.screenProps.venues, (venue) => venue.id === id);
    const setTimes = findMany(this.props.screenProps.set_times, venue.set_times);
    const sections = setTimesBy('day', setTimes, this.props.screenProps);

    const props = {
      venue,
      sections,
      onNavigate: (url, item) => this.props.navigation.navigate(url, item)
    };

    return <VenueView {...props} />;
  }
}

VenueContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  }).isRequired,
  screenProps: PropTypes.shape({
    bands: PropTypes.array.isRequired,
    venues: PropTypes.array.isRequired,
    days: PropTypes.array.isRequired,
    set_times: PropTypes.array.isRequired
  }).isRequired
};

export default VenueContainer;
