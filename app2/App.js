import React from 'react';
import PropTypes from 'prop-types';
import AppNavigator from './navigators/App';
import fullSchedule from './data/full-schedule';
import { get } from './data/my-schedule';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullSchedule: { bands: [], venues: [], set_times: [], days: [] },
      mySchedule: []
    };
  }

  componentDidMount() {
    this.setFullSchedule();
    this.setMySchedule();
  }

  getChildContext() {
    return {
      mySchedule: this.state.mySchedule,
      refreshMySchedule: () => this.setMySchedule()
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

  setMySchedule() {
    return get().then((mySchedule) => this.setState({ mySchedule }));
  }

  render() {
    return <AppNavigator screenProps={this.state.fullSchedule} />;
  }
}

App.childContextTypes = {
  mySchedule: PropTypes.arrayOf(PropTypes.string),
  refreshMySchedule: PropTypes.func.isRequired
};

export default App;
