import Band from './views/band';
import DayList from './views/day-list';
import Home from './views/home';
import List from './views/list';
import React from 'react-native';
import Schedule from './views/schedule';
import Venue from './views/venue';

import lodash from 'lodash';
import utils from './utils';

const Component = React.Component;
// const BackAndroid = React.BackAndroid;

function goTo(name, model, navigator) {
  const index = utils.currentIndex(navigator) + 1;
  navigator.push({ name, index, title: model.name, id: model.id });
}

function home(navigator, fullSchedule) {
  return <Home navigator={navigator} fullSchedule={fullSchedule} />;
}

function day(navigator, fullSchedule, route) {
  const model = lodash.find(fullSchedule.days, { id: route.id });
  return <DayList navigator={navigator} fullSchedule={fullSchedule} day={model} />;
}

function band(navigator, fullSchedule, route) {
  const model = lodash.find(fullSchedule.bands, { id: route.id });
  return <Band navigator={navigator} fullSchedule={fullSchedule} band={model} />;
}

function venue(navigator, fullSchedule, route) {
  const model = lodash.find(fullSchedule.venues, { id: route.id });
  return <Venue navigator={navigator} fullSchedule={fullSchedule} venue={model} />;
}

function schedule(navigator, fullSchedule) {
  return <Schedule navigator={navigator} fullSchedule={fullSchedule} />;
}

function bands(navigator, fullSchedule) {
  const dataSource = lodash.sortBy(fullSchedule.bands, ['name']);
  return <List goTo={(model) => goTo('Band', model, navigator)} dataSource={dataSource} />;
}

function venues(navigator, fullSchedule) {
  const dataSource = lodash.sortBy(fullSchedule.venues, ['name']);
  return <List goTo={(model) => goTo('Venue', model, navigator)} dataSource={dataSource} />;
}

const components = {
  'Home': home,
  'Day': day,
  'Band': band,
  'Venue': venue,
  'Schedule': schedule,
  'Bands': bands,
  'Venues': venues
};

export default class NavManager extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentWillMount() {
  //   BackAndroid.addEventListener('hardwareBackPress', this.androidBack);
  // }

  // componentWillUnmount() {
  //   BackAndroid.removeEventListener('hardwareBackPress', this.androidBack);
  // }

  // androidBack() {
  //   console.log('ahhhhhhh');
  //   return true;
  // }

  render() {
    const navigator = this.props.navigator;
    const fullSchedule = this.props.fullSchedule;
    const route = this.props.route;

    return components[route.name](navigator, fullSchedule, route);
  }
}

NavManager.propTypes = {
  fullSchedule: React.PropTypes.object,
  navigator: React.PropTypes.object,
  route: React.PropTypes.object
};
