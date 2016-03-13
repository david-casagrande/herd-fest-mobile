import React from 'react-native';

import scheduleData from './data/schedule';

const Component = React.Component;
// const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars


// const styles = StyleSheet.create({});

function toggle(scheduled, id, context) {
  const method = scheduled ? 'remove' : 'add';
  scheduleData[method](id).then(() => {
    context.checkSchedule();

    if (typeof context.props.toggleCallback === 'function') {
      context.props.toggleCallback(!scheduled, id);
    }
  });
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scheduled: false
    };

    this.checkSchedule();
  }

  checkSchedule() {
    scheduleData.get().then((schedule) => {
      this.setState({ scheduled: schedule.indexOf(this.props.setTime.id) > -1 });
    });
  }

  render() {
    const text = this.state.scheduled ? '-' : '+';
    const style = this.props.style || {};

    return (
      <TouchableOpacity onPress={() => toggle(this.state.scheduled, this.props.setTime.id, this)}>
        <Text style={style}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
