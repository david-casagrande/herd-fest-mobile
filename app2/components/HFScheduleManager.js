import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import styles from '../styles/hf-schedule-manager';
import { add, remove } from '../data/my-schedule';

function checkSchedule(schedule, id) {
  return schedule.indexOf(id) > -1;
}

class HFScheduleManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scheduled: undefined // eslint-disable-line no-undefined
    };
  }

  componentDidMount() {
    const scheduled = checkSchedule(this.context.mySchedule, this.props.setTime.id);
    this.setState({ scheduled });
  }


  onRemove() {
    return remove(this.props.setTime.id).then(() => {
      this.context.refreshMySchedule();
      this.setState({ scheduled: false });
    });
  }

  onAdd() {
    return add(this.props.setTime.id).then(() => {
      this.context.refreshMySchedule();
      this.setState({ scheduled: true });
    });
  }

  onPress() {
    if (this.state.scheduled) {
      return this.onRemove();
    }

    return this.onAdd();
  }

  text() {
    const style = [styles.text];
    const { tintColor } = this.props;

    if (this.state.scheduled) {
      style.push(styles.textRotate);
    }

    if (tintColor) {
      style.push({ color: tintColor });
    }

    return <Text style={style}>+</Text>;
  }

  render() {
    if (typeof this.state.scheduled === 'undefined') {
      return null;
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => this.onPress()}>
          <View style={styles.content}>
            {this.text()}
          </View>
        </TouchableOpacity>
    );
  }
}

HFScheduleManager.propTypes = {
  setTime: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  tintColor: PropTypes.string,
  // toggleCallback: React.PropTypes.func
};

HFScheduleManager.contextTypes = {
  mySchedule: PropTypes.arrayOf(PropTypes.string),
  refreshMySchedule: PropTypes.func.isRequired
};

export default HFScheduleManager;
