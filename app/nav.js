import Band from './band'; // eslint-disable-line no-unused-vars
import DayList from './day-list'; // eslint-disable-line no-unused-vars
import Home from './home'; // eslint-disable-line no-unused-vars
import List from './list'; // eslint-disable-line no-unused-vars
import NavigationRouteMapper from './navigation/route-mapper';
import React from 'react-native';
import Schedule from './schedule'; // eslint-disable-line no-unused-vars
import Venue from './venue'; // eslint-disable-line no-unused-vars

import fullSchedule from './data/full-schedule';
import lodash from 'lodash';
import lookup from './data/lookup';
import navStyles from './styles/nav-styles';
import utils from './utils';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Navigator = React.Navigator; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(navStyles);

export default class NavigationBarSample extends Component {
  constructor(props) {
    super(props);
    this.state = { fullSchedule: { bands: [], venues: [], set_times: [], days: [] } };
    this.setFullSchedule();
  }

  setFullSchedule() {
    fullSchedule.get().then((json) => {
      this.setState({ fullSchedule: json });
    });
  }

  findDay(query) {
    return this.state.fullSchedule.days.find((day) => day.name === query);
  }

  goToBand(band, navigator) {
    navigator.push({ name: 'Band', index: utils.currentIndex(navigator) + 1, title: band.name, band_id: band.id });
  }

  goToVenue(venue, navigator) {
    navigator.push({ name: 'Venue', index: utils.currentIndex(navigator) + 1, title: venue.name, venue_id: venue.id });
  }

  render() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{ name: 'Home', index: 0 }}
        onDidFocus={(route) => {
          if (route.name === 'Home') {
            this.setFullSchedule();
          }
        }}
        renderScene={(route, navigator) => {
          const component = {
            'Home': <Home navigator={navigator} fullSchedule={this.state.fullSchedule} />,
            'Bands': <List goTo={(band) => this.goToBand(band, navigator)} dataSource={lodash.sortBy(this.state.fullSchedule.bands, ['name'])} />,
            'Venues': <List goTo={(venue) => this.goToVenue(venue, navigator)} dataSource={lodash.sortBy(this.state.fullSchedule.venues, ['name'])} />,
            'Day': <DayList navigator={navigator} day={lookup.getOne(this.state.fullSchedule.days, route.day_id)}
                    fullSchedule={this.state.fullSchedule} />,
            'Band': <Band navigator={navigator} band={lookup.getOne(this.state.fullSchedule.bands, route.band_id)}
                    fullSchedule={this.state.fullSchedule}/>,
            'Venue': <Venue navigator={navigator} venue={lookup.getOne(this.state.fullSchedule.venues, route.venue_id)}
                      fullSchedule={this.state.fullSchedule}/>,
            'Schedule': <Schedule navigator={navigator} fullSchedule={this.state.fullSchedule}></Schedule>
          };

          return component[route.name];
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  }
}
