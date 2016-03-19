import NavManager from './nav-manager'; // eslint-disable-line no-unused-vars
import NavigationRouteMapper from './navigation/route-mapper';
import React from 'react-native';

import fullSchedule from './data/full-schedule';
import navStyles from './styles/nav-styles';

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
    fullSchedule.get()
      .then((json) => {
        fullSchedule.cache(json);
        this.setState({ fullSchedule: json });
      })
      .catch(() => {
        this.setFullScheduleFromCache();
      });
  }

  setFullScheduleFromCache() {
    fullSchedule.getCache()
      .then((value) => {
        if (value) {
          this.setState({ fullSchedule: value });
        }
      });
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
        renderScene={(route, navigator) => <NavManager route={route} navigator={navigator} fullSchedule={this.state.fullSchedule} />}
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
