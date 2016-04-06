import React from 'react-native';

import scheduleData from '../../data/schedule';
import toggleSetTimeStyles from '../../styles/components/toggle-set-time';

const Component = React.Component;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const StyleSheet = React.StyleSheet;
const View = React.View;

const styles = StyleSheet.create(toggleSetTimeStyles);

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

  text(rotate) {
    const style = [
      styles.text,
      this.props.style || {},
      {
        transform: [{ rotate }],
      }
    ];

    return <Text style={style}>+</Text>;
  }

  render() {
    const rotate = this.state.scheduled ? '45deg' : '0deg';
    const left = this.state.scheduled ? -2 : 0;

    return (
      <View style={[styles.container, { left }]}>
        <TouchableOpacity onPress={() => toggle(this.state.scheduled, this.props.setTime.id, this)}>
          {this.text(rotate)}
        </TouchableOpacity>
      </View>
    );
  }
}

ToggleSetTime.propTypes = {
  setTime: React.PropTypes.shape({
    id: React.PropTypes.string
  }),
  style: React.PropTypes.array
};
