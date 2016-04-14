import React from 'react-native';
import MapAddress from '../views/components/map-address';

import lodash from 'lodash';

// const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const View = React.View;
const TouchableOpacity = React.TouchableOpacity;

import navStyles from '../styles/nav-styles';

// class NavButton extends React.Component {
//   render() {
//     return (
//       <TouchableHighlight>
//         style={styles.button}
//         underlayColor="#B5B5B5"
//         onPress={this.props.onPress}>
//         <Text style={styles.buttonText}>{this.props.text}</Text>
//       </TouchableHighlight>
//     );
//   }
// }

const styles = StyleSheet.create(navStyles);

// all methods get route, navigator, index, navState arguments

const NavigationRouteMapper = {
  LeftButton: function leftButton(route, navigator, index) {
    if (index < 1) {
      return null;
    }

    // const previousRoute = navState.routeStack[index - 1];

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function rightButton(route, navigator) {
    if(route.name === 'Venue') {
      const venue = lodash.find(navigator.props.fullSchedule.venues, { 'id': route.id });
      if (!venue) {
        return null;
      }
      return (
        <MapAddress address={venue.street_address}>
          <Text style={[styles.navBarText, styles.navBarButtonText, styles.navBarRightButton]}>Map</Text>
        </MapAddress>
      );
    }
  },

  Title: function title(route, navigator, index) {
    if (index < 1) {
      return null;
    }

    if(route.name === 'Venue') {
      const venue = lodash.find(navigator.props.fullSchedule.venues, { 'id': route.id });
      if (!venue) {
        return null;
      }
      return (
        <View style={{ paddingTop: 3 }}>
          <Text style={[styles.navBarTitleText, { marginVertical: 0, fontSize: 13 }]} numberOfLines={1}>{venue.name}</Text>
          <Text style={[styles.navBarTitleText, { marginVertical: 0, fontSize: 16 }]} numberOfLines={1}>{venue.street_address}</Text>
        </View>
      );
    }

    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]} numberOfLines={1}>
        {route.title}
      </Text>
    );
  }
};

export default NavigationRouteMapper;
