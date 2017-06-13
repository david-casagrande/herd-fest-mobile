import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import HFContainer from '../components/HFContainer';
import styles from '../styles/views/home';

const LINKS = [
  { label: 'SCHEDULE', url: 'Schedule' },
  { label: 'MY SCHEDULE', url: 'MySchedule' },
  { label: 'BANDS', url: 'Bands' },
  { label: 'VENUES', url: 'Venues' },
];

class HomeView extends React.Component {
  link(link) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(link.url)} key={link.url} style={styles.link}>
        <Text style={styles.linkText}>{link.label}</Text>
      </TouchableOpacity>
    );
  }

  links() {
    return (
      <View style={styles.links}>
        {LINKS.map((link) => this.link(link))}
      </View>
    );
  }

  image() {
    return <Image style={styles.image} resizeMode="contain" source={require('../images/home.png')} />;
  }

  content() {
    return (
      <View style={styles.content}>
        {this.image()}
        {this.links()}
      </View>
    );
  }

  render() {
    return (
      <HFContainer style={[{ paddingTop: 0 }]}>
        {this.content()}
      </HFContainer>
    );
  }
}

HomeView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default HomeView;
