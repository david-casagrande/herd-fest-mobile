import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './views/home';
import fullSchedule from './data/full-schedule';

class Bands extends React.Component {
  render() {
    console.log(this.context.bands)

    const props = {
      data: this.context.bands,
      keyExtractor: (item) => item.id,
      renderItem: ({ item }) => <Text>{item.name}</Text>
    };

    return <FlatList {...props} />;
  }
}

Bands.contextTypes = {
  bands: PropTypes.array.isRequired
};

const Navigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTintColor: 'transparent'
    }
  },
  Bands: {
    screen: Bands,
    navigationOptions: {
      title: 'Bands'
    }
  }
});

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
    return <Navigator />;
  }
}

App.childContextTypes = {
  bands: PropTypes.array,
  venues: PropTypes.array,
  set_times: PropTypes.array,
  days: PropTypes.array
};

export default App;
