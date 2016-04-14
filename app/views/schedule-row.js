import React from 'react-native';
import ToggleSetTime from './components/toggle-set-time';

import scheduleStyles from '../styles/schedule-styles';
import utils from '../utils';

const Animated = React.Animated;
const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const View = React.View;

const initHeight = 52;
const duration = 300;

const styles = StyleSheet.create(scheduleStyles);

export default class ScheduleRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heightAnim: new Animated.Value(initHeight)
    };
  }

  render() {
    const rowData = this.props.rowData;
    const context = this.props.context;
    const commonPadding = 4;

    function anim(animContext, parent) {
      Animated.timing(
        animContext.state.heightAnim,
        { toValue: 0, duration }
      ).start(() => parent.setSchedule());
    }

    return (
      <Animated.View style={[styles.rowContainer, { height: this.state.heightAnim, overflow: 'hidden' }]}>
        <Text style={[styles.row, styles.setTime]}>{utils.formatDate(rowData.startTime)}</Text>
        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: commonPadding }}>
          <Text style={[styles.venue]} numberOfLines={1}>{rowData.venue.name}</Text>
          <Text style={[styles.band]} numberOfLines={1}>{rowData.band.name}</Text>
        </View>
        <ToggleSetTime setTime={rowData} style={[styles.row, styles.toggleSetTime]}
        toggleCallback={() => anim(this, context)}/>
      </Animated.View>
    );
  }
}

ScheduleRow.initHeight = initHeight;
ScheduleRow.duration = duration;

ScheduleRow.propTypes = {
  rowData: React.PropTypes.shape({
    startTime: React.PropTypes.string,
    band: React.PropTypes.shape({ name: React.PropTypes.string }),
    venue: React.PropTypes.shape({ name: React.PropTypes.string })
  }),
  context: React.PropTypes.object
};
