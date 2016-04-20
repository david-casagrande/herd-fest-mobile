import React from 'react-native';

import lodash from 'lodash';
import navStyles from '../styles/nav-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const View = React.View;

const styles = StyleSheet.create(navStyles);

function venue(route, navigator) {
  const model = lodash.find(navigator.props.fullSchedule.venues, { 'id': route.id });

  if (!model) {
    return false;
  }

  return (
    <View style={styles.navBarContainer}>
      <Text style={[styles.navBarTitleText, styles.navBarVenueTitleText]} numberOfLines={1}>{model.name}</Text>
      <Text style={[styles.navBarTitleText, styles.navBarAddressTitleText]} numberOfLines={1}>{model.street_address}</Text>
    </View>
  );
}

export default class TitleNav extends Component {
  render() {
    if (this.props.index < 1) {
      return false;
    }

    if (this.props.route.name === 'Venue') {
      return venue(this.props.route, this.props.navigator, this.props.index);
    }

    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]} numberOfLines={1}>
        {this.props.route.title}
      </Text>
    );
  }
}

TitleNav.propTypes = {
  route: React.PropTypes.object,
  navigator: React.PropTypes.object,
  index: React.PropTypes.number
};
