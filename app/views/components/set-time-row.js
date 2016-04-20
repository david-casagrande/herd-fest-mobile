import React from 'react-native';

import ToggleSetTime from './toggle-set-time';

import listStyles from '../../styles/components/list';
import setTimeRowStyles from '../../styles/components/set-time-row';
import utils from '../../utils';

const Component = React.Component;
const View = React.View;
const Text = React.Text;
const StyleSheet = React.StyleSheet;

const styles = StyleSheet.create(Object.assign({}, listStyles, setTimeRowStyles));

export default class SetTimeRow extends Component {
  yieldContent() {
    let content = null;

    if (this.props.children) {
      content = this.props.children;
    } else if (this.props.content) {
      content = <Text style={styles.contentText} numberOfLines={1}>{this.props.content}</Text>;
    }

    return (
      <View style={[styles.column, styles.content]}>
        {content}
      </View>
    );
  }

  startTime() {
    const startTime = utils.formatDate(this.props.setTime.startTime);

    return (
      <View style={[styles.column, styles.setTime]}>
        <View style={styles.columnContainer}>
          <Text style={[styles.setTimeText, { color: this.props.color }]}>{startTime}</Text>
        </View>
      </View>
    );
  }

  render() {
    const setTime = this.props.setTime;

    return (
      <View style={styles.rowContainer}>
        {this.startTime()}
        {this.yieldContent()}
        <ToggleSetTime setTime={setTime} color={this.props.color} />
      </View>
    );
  }
}

SetTimeRow.propTypes = {
  setTime: React.PropTypes.shape({
    startTime: React.PropTypes.string
  }),
  color: React.PropTypes.string,
  content: React.PropTypes.string
};
