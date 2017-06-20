import React from 'react';
import PropTypes from 'prop-types';
import AppNavigator from './navigators/App';
import fullSchedule from './data/full-schedule';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullSchedule: { bands: [], venues: [], set_times: [], days: [] }
    };
  }

  componentDidMount() {
    this.setFullSchedule();
  }

  getChildContext() {
    return this.state.fullSchedule;
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
    return <AppNavigator screenProps={this.state.fullSchedule} />;
  }
}

App.childContextTypes = {
  bands: PropTypes.array,
  venues: PropTypes.array,
  set_times: PropTypes.array,
  days: PropTypes.array
};

export default App;
