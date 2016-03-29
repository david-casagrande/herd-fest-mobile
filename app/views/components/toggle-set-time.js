import React from 'react-native';

import scheduleData from '../../data/schedule';

const Component = React.Component;
// const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
// const Alert = React.Alert;

// const styles = StyleSheet.create({});

function toggle(scheduled, id, context) {
  const method = scheduled ? 'remove' : 'add';

  return scheduleData[method](id).then(() => {
    context.checkSchedule();
    // Alert.alert(scheduled ? 'Event Removed' : 'Event Added');

    if (typeof context.props.toggleCallback === 'function') {
      context.props.toggleCallback(!scheduled, id);
    }
  });
}

export default class ToggleSetTime extends Component {
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

ToggleSetTime.propTypes = {
  setTime: React.PropTypes.shape({
    id: React.PropTypes.string
  }),
  style: React.PropTypes.array
};
