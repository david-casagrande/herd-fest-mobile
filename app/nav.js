import NavManager from './nav-manager';
import NavigationRouteMapper from './navigation/route-mapper';
import React from 'react-native';

import fullSchedule from './data/full-schedule';
import navStyles from './styles/nav-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Navigator = React.Navigator;

const styles = StyleSheet.create(navStyles);

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullSchedule: { bands: [], venues: [], set_times: [], days: [] },
      showNavBar: false
    };
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

  setShowNavBar(showNavBar) {
    this.setState({ showNavBar });
  }

  render() {
    const navBarStyles = this.state.showNavBar ? styles.navBar : [styles.navBar, { backgroundColor: 'transparent' }];

    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{ name: 'Home', index: 0 }}
        onWillFocus={(route) => {
          if (route.name === 'Home') {
            this.setShowNavBar(false);
          }
        }}
        onDidFocus={(route) => {
          if (route.name !== 'Home') {
            this.setShowNavBar(true);
          }

          if (route.name === 'Home') {
            this.setFullSchedule();
          }
        }}
        renderScene={(route, navigator) => <NavManager route={route} navigator={navigator} fullSchedule={this.state.fullSchedule} />}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationRouteMapper}
            style={navBarStyles}
          />
        }
        fullSchedule={this.state.fullSchedule}
      />
    );
  }
}
