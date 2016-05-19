import React from 'react';
import ReactNative from 'react-native';
import SetTimesByDay from './components/set-times-by-day';

import bandStyles from '../styles/band-styles';

const Component = React.Component;
const Image = ReactNative.Image;
const Linking = ReactNative.Linking;
const ScrollView = ReactNative.ScrollView;
const StyleSheet = ReactNative.StyleSheet;
const Text = ReactNative.Text;
const TouchableOpacity = ReactNative.TouchableOpacity;
const View = ReactNative.View;

const styles = StyleSheet.create(bandStyles);

export default class Band extends Component {
  facebookOnPress() {
    const url = this.props.band.facebook_url;

    return Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Don't know how to open URI: ${url}`); // eslint-disable-line no-console
      }

      return Linking.openURL(url);
    });
  }

  facebook() {
    if (!this.props.band.facebook_url) {
      return false;
    }

    return (
      <TouchableOpacity onPress={() => this.facebookOnPress()}>
        <Text>Facebook</Text>
      </TouchableOpacity>
    );
  }


  image() {
    if (!this.props.band.image_url) {
      return null;
    }

    return (
      <Image
        source={{ uri: this.props.band.image_url }}
        style={styles.image}
        resizeMode={'cover'}
      />
    );
  }

  description() {
    if (!this.props.band.description) {
      return null;
    }

    return <Text style={styles.text}>{this.props.band.description}</Text>;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.image()}
        <View style={styles.bandDetail}>
          <Text style={[styles.text, styles.bandName]}>{this.props.band.name}</Text>
          {this.description()}
        </View>
        <SetTimesByDay fullSchedule={this.props.fullSchedule} setTimes={this.props.band.set_times} />
      </ScrollView>
    );
  }
}

Band.propTypes = {
  band: React.PropTypes.shape({
    description: React.PropTypes.string,
    image_url: React.PropTypes.string,
    name: React.PropTypes.string,
    set_times: React.PropTypes.array,
    facebook_url: React.PropTypes.string
  }),
  fullSchedule: React.PropTypes.object
};
