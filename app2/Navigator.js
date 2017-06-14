import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Text } from 'react-native';

import HomeView from './views/Home';
import BandsView from './views/Bands';
import BandView from './views/Band';
import VenuesView from './views/Venues';
import VenueView from './views/Venue';

const OPTIONS = {
  navigationOptions: {
    headerStyle: { backgroundColor: '#fff' }
  }
};

const Navigator = StackNavigator({
  Home: {
    screen: HomeView
  },
  Bands: {
    screen: BandsView,
    navigationOptions: {
      title: 'Bands'
    }
  },
  Venues: {
    screen: VenuesView,
    navigationOptions: {
      title: 'Venues'
    }
  },
  Band: {
    screen: BandView,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.band.name,
    })
  },
  Venue: {
    screen: VenueView,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.venue.name,
      headerRight: () => <Text>Map</Text>
    })
  },
}, OPTIONS);

export default Navigator;
