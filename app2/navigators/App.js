import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Text } from 'react-native';

import HomeContainer from '../containers/Home';
import VenuesContainer from '../containers/Venues';
import BandsContainer from '../containers/Bands';
import VenueContainer from '../containers/Venue';
import BandContainer from '../containers/Band';
import MyScheduleContainer from '../containers/MySchedule';
import ScheduleNavigator from './Schedule';
import HFMap from '../components/HFMap';
import HFHeaderTitle from '../components/HFHeaderTitle';

const OPTIONS = {
  navigationOptions: {
    headerStyle: { backgroundColor: '#fff' }
  }
};

const AppNavigator = StackNavigator({
  Home: {
    screen: HomeContainer
  },
  Bands: {
    screen: BandsContainer,
    navigationOptions: {
      title: 'Bands'
    }
  },
  Venues: {
    screen: VenuesContainer,
    navigationOptions: {
      title: 'Venues'
    }
  },
  Band: {
    screen: BandContainer,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name
    })
  },
  Venue: {
    screen: VenueContainer,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HFHeaderTitle title={navigation.state.params.street_address} sub={navigation.state.params.name} />,
      headerRight: <HFMap label="Map" address={navigation.state.params.street_address} />
    })
  },
  Schedule: {
    screen: ScheduleNavigator,
    navigationOptions: {
      title: 'Schedule'
    }
  },
  MySchedule: {
    screen: MyScheduleContainer,
    navigationOptions: {
      title: 'My Schedule'
    }
  }
}, OPTIONS);

export default AppNavigator;
