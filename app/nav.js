import Band from './band'; // eslint-disable-line no-unused-vars
import DayList from './day-list'; // eslint-disable-line no-unused-vars
import Home from './home'; // eslint-disable-line no-unused-vars
import List from './list'; // eslint-disable-line no-unused-vars
import NavigationRouteMapper from './navigation/route-mapper';
import React from 'react-native';
import Schedule from './schedule';
import Venue from './venue'; // eslint-disable-line no-unused-vars

import fullSchedule from './data/full-schedule';
import lookup from './data/lookup';
import navStyles from './styles/nav-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Navigator = React.Navigator; // eslint-disable-line no-unused-vars

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
