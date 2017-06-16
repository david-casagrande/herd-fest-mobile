import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/hf-schedule-manager';

// import scheduleData from '../../data/schedule';
// import toggleSetTimeStyles from '../../styles/components/toggle-set-time';
//
// const Component = React.Component;
// const Text = ReactNative.Text;
// const TouchableOpacity = ReactNative.TouchableOpacity;
// const StyleSheet = ReactNative.StyleSheet;
// const View = ReactNative.View;
//
// const styles = StyleSheet.create(toggleSetTimeStyles);

// function toggle(scheduled, id, context) {
//   const method = scheduled ? 'remove' : 'add';
//
//   return scheduleData[method](id).then(() => {
//     context.setState({ scheduled: !scheduled });
//
//     if (typeof context.props.toggleCallback === 'function') {
//       context.props.toggleCallback(!scheduled, id);
//     }
//   });
// }

class HFScheduleManager extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     scheduled: undefined // eslint-disable-line no-undefined
  //   };
  //
  //   this.checkSchedule();
  // }
  //
  // checkSchedule() {
  //   return scheduleData.get().then((schedule) => {
  //     schedule = schedule || [];
  //     this.setState({ scheduled: schedule.indexOf(this.props.setTime.id) > -1 });
  //   });
  // }
  //
  // text(rotate) {
  //   const style = [
  //     styles.text,
  //     {
  //       color: this.props.color,
  //       transform: [{ rotate }]
  //     }
  //   ];
  //
  //   return <Text style={style}>+</Text>;
  // }
  //
  render() {
    return (
        <TouchableOpacity style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.text}>+</Text>
          </View>
        </TouchableOpacity>
    );
    // if (typeof this.state.scheduled === 'undefined') {
    //   return null;
    // }
    //
    // const rotate = this.state.scheduled ? '45deg' : '0deg';
    //
    // return (
    //   <TouchableOpacity onPress={() => toggle(this.state.scheduled, this.props.setTime.id, this)}>
    //     <View style={styles.containerWrapper}>
    //       <View style={styles.container}>
    //         {this.text(rotate)}
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // );
  }
}

HFScheduleManager.propTypes = {
  // setTime: React.PropTypes.shape({
  //   id: React.PropTypes.string
  // }),
  // color: React.PropTypes.string,
  // toggleCallback: React.PropTypes.func
};

export default HFScheduleManager;
