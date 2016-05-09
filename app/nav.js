import NavManager from './nav-manager';
import NavigationRouteMapper from './navigation/route-mapper';
import React from 'react';
import ReactNative from 'react-native';

import fullSchedule from './data/full-schedule';
import navStyles from './styles/nav-styles';
import utils from './utils';

const BackAndroid = ReactNative.BackAndroid;
const Component = React.Component;
const Navigator = ReactNative.Navigator;
const StyleSheet = ReactNative.StyleSheet;

const styles = StyleSheet.create(navStyles);

let globalNavigator = null;

function hardwareBackPress() {
  if (globalNavigator && globalNavigator.getCurrentRoutes().length > 1) {
    globalNavigator.pop();
    return true;
  }
  return false;
}

function androidEventListener() {
  if (utils.isAndroid()) {
    BackAndroid.addEventListener('hardwareBackPress', () => hardwareBackPress());
  }
}

androidEventListener();

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
    globalNavigator = navigator;
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
