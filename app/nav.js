import React, {
  Component,
  Navigator,
  StyleSheet
} from 'react-native';

import Band from './band';
import DayList from './day-list';
import Home from './home';
import List from './list';
import NavigationRouteMapper from './navigation/route-mapper';
import Venue from './venue';

import fullSchedule from './data/full-schedule';
import lookup from './data/lookup';
import navStyles from './styles/nav-styles';

const styles = StyleSheet.create(navStyles);

export default class NavigationBarSample extends Component {
  constructor(props) {
    super(props);
    this.state = { fullSchedule: { bands: [], venues: [], set_times: [], days: [] } };
  }

  setFullSchedule() {
    fullSchedule.get().then((json) => {
      this.setState({ fullSchedule: json });
    });
  }

  componentWillMount() {
    // var navigator = this.props.navigator;

    // var callback = (event) => {
    //   console.log(
    //     `NavigationBarSample : event ${event.type}`,
    //     {
    //       route: JSON.stringify(event.data.route),
    //       target: event.target,
    //       type: event.type
    //     }
    //   );
    // };

    // Observe focus change events from this component.
    // this._listeners = [
      // navigator.navigationContext.addListener('willfocus', callback),
      // navigator.navigationContext.addListener('didfocus', callback),
    // ];

    this.setFullSchedule();
  }

  componentWillUnmount() {
    // this._listeners && this._listeners.forEach((listener) => listener.remove());
  }

  findDay(query) {
    return this.state.fullSchedule.days.find((day) => day.name === query);
  }

  render() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{ name: 'Home', index: 0 }}
        renderScene={(route, navigator) => {
          const component = {
            'Home': <Home navigator={navigator} />,
            'Bands': <List navigator={navigator} dataSource={this.state.fullSchedule.bands} />,
            'Days': <List navigator={navigator} dataSource={this.state.fullSchedule.days} />,
            'Venues': <List navigator={navigator} dataSource={this.state.fullSchedule.venues} />,
            'SetTimes': <List navigator={navigator} dataSource={this.state.fullSchedule.set_times} />,
            'Day': <DayList navigator={navigator} day={lookup.getOne(this.state.fullSchedule.days, route.day_id)}
                    fullSchedule={this.state.fullSchedule} />,
            'Band': <Band navigator={navigator} band={lookup.getOne(this.state.fullSchedule.bands, route.band_id)}
                    fullSchedule={this.state.fullSchedule}/>,
            'Venue': <Venue navigator={navigator} venue={lookup.getOne(this.state.fullSchedule.venues, route.venue_id)}
                      fullSchedule={this.state.fullSchedule}/>
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
