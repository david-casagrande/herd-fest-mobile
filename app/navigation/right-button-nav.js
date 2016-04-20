import React from 'react-native';
import MapAddress from '../views/components/map-address';

import lodash from 'lodash';
import navStyles from '../styles/nav-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;

const styles = StyleSheet.create(navStyles);

function venue(route, navigator) {
  const model = lodash.find(navigator.props.fullSchedule.venues, { 'id': route.id });

  if (!model) {
    return false;
  }

  return (
    <MapAddress address={model.street_address}>
      <Text style={[styles.navBarText, styles.navBarRightButton]}>Map</Text>
    </MapAddress>
  );
}

const components = {
  'Venue': venue
};

export default class RightButtonNav extends Component {
  render() {
    const routeName = this.props.route.name;

    if (typeof components[routeName] !== 'undefined') {
      return components[routeName](this.props.route, this.props.navigator, this.props.index);
    }

    return false;
  }
}

RightButtonNav.propTypes = {
  route: React.PropTypes.object,
  navigator: React.PropTypes.object,
  index: React.PropTypes.number
};
