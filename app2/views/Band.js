import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import HFContainer from '../components/HFContainer';
import styles from '../styles/views/band';

class BandView extends React.Component {
  image() {
    const imageURL = this.props.band.image_url;
    if (!imageURL) {
      return false;
    }

    const props = {
      source: { uri: imageURL },
      resizeMode: 'cover',
      style: styles.image
    };

    return <Image {...props} />;
  }

  description() {
    const description = this.props.band.description;
    if (!description) {
      return false;
    }

    return <Text style={styles.description} data-id="description">{description}</Text>;
  }

  name() {
    const name = this.props.band.name;
    if (!name) {
      return false;
    }

    return <Text style={styles.name} data-id="name">{name}</Text>;
  }

  content() {
    return (
      <ScrollView>
        {this.image()}
        <View style={styles.details}>
          {this.name()}
          {this.description()}
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <HFContainer>
        {this.content()}
      </HFContainer>
    );
  }
}

BandView.propTypes = {
  band: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
    set_times: PropTypes.array.isRequired
  }).isRequired
};

// BandView.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//     state: PropTypes.shape({
//       params: PropTypes.shape({
//         band: PropTypes.shape({
//           name: PropTypes.string,
//           description: PropTypes.string,
//           image_url: PropTypes.string,
//           set_times: PropTypes.array
//         }).isRequired
//       }).isRequired
//     }).isRequired
//   }).isRequired
// };

export default BandView;
