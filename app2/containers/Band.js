import React from 'react';
import PropTypes from 'prop-types';
import BandView from '../views/Band';
import { find } from 'lodash';
import { findMany, setTimesBy } from '../utils';

class BandContainer extends React.Component {
  render() {
    const { id } = this.props.navigation.state.params;
    const band = find(this.props.screenProps.bands, (band) => band.id === id);
    const setTimes = findMany(this.props.screenProps.set_times, band.set_times);
    const sections = setTimesBy('day', setTimes, this.props.screenProps);

    return <BandView band={band} sections={sections} />;
  }
}

BandContainer.propTypes = {
  navigation: PropTypes.shape({
    // navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};

export default BandContainer;
