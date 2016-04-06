import React from 'react-native';

import scheduleData from '../../data/schedule';

const Component = React.Component;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;

function toggle(scheduled, id, context) {
  const method = scheduled ? 'remove' : 'add';

  return scheduleData[method](id).then(() => {
    context.checkSchedule();

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
    const rotate = this.state.scheduled ? '45deg' : '0deg';
    const paddingLeft = this.state.scheduled ? 0 : 0;
    const style = this.props.style || {};

    return (
      <TouchableOpacity onPress={() => toggle(this.state.scheduled, this.props.setTime.id, this)}>
        <Text style={[style, { transform: [{ rotate }], paddingLeft }]}>+</Text>
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
