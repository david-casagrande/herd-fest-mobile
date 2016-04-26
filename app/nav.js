import NavManager from './nav-manager';
import NavigationRouteMapper from './navigation/route-mapper';
import React from 'react-native';

import fullSchedule from './data/full-schedule';
import navStyles from './styles/nav-styles';
import utils from './utils';

const BackAndroid = React.BackAndroid;
const Component = React.Component;
const Navigator = React.Navigator;
const StyleSheet = React.StyleSheet;

const styles = StyleSheet.create(navStyles);

let _navigator = null;

function hardwareBackPress() {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
}

(function androidEventListener() {
  if (utils.isAndroid()) {
    BackAndroid.addEventListener('hardwareBackPress', () => hardwareBackPress());
  }
})();

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

  renderScene(route, navigator) {
    _navigator = navigator;
    return <NavManager route={route} navigator={navigator} fullSchedule={this.state.fullSchedule} />;
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
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
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
