import React from 'react-native';

import homeStyles from '../styles/home-styles';

const Component = React.Component;
const Image = React.Image;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;

const styles = StyleSheet.create(homeStyles);

const LinkMap = [
  'Schedule',
  'My Schedule',
  'Bands',
  'Venues'
];

export default class Home extends Component {
  goTo(name) {
    this.props.navigator.push({ name, title: name, index: 1 });
  }

  link(name, idx) {
    return (
      <TouchableOpacity key={idx} onPress={() => this.goTo(name)} style={[styles.link]}>
        <Text style={styles.linkText}>{name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  links() {
    return LinkMap.map((name, idx) => this.link(name, idx));
  }

  image() {
    return (
      <Image style={styles.logo} resizeMode={'contain'} source={require('../images/home.png')} />
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {this.image()}
          <View style={styles.days}>
            {this.links()}
          </View>
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigator: React.PropTypes.object
};
