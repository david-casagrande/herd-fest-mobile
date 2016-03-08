import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import scheduleData from './data/schedule';

const styles = StyleSheet.create({});

function toggle(scheduled, id, context) {
  const method = scheduled ? 'remove' : 'add';
  scheduleData[method](id).then(() => context.checkSchedule())
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scheduled: false
    }

    this.checkSchedule();
  }

  checkSchedule() {
    scheduleData.get().then((schedule) => {
      this.setState({ scheduled: schedule.indexOf(this.props.setTime.id) > -1 })
    });
  }

  render() {
    const text = this.state.scheduled ? 'Remove' : 'Add';

    return (
      <TouchableHighlight onPress={() => toggle(this.state.scheduled, this.props.setTime.id, this)}>
        <Text>{text}</Text>
      </TouchableHighlight>
    );
  }
}
