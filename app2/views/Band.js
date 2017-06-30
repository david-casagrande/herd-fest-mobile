import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import HFParallax from '../components/HFParallax';
import HFContainer from '../components/HFContainer';
import HFSectionList from '../components/HFSectionList';
import HFSetTime from '../components/HFSetTime';
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
    const { description } = this.props.band;
    if (!description) {
      return false;
    }

    return <Text style={styles.description} data-id="description">{description}</Text>;
  }

  name() {
    const { name } = this.props.band;
    if (!name) {
      return false;
    }

    return <Text style={styles.name} data-id="name">{name}</Text>;
  }

  setTimes() {
    const props = {
      keyProp: 'id',
      sections: this.props.sections,
      renderItem: ({ item }) => <HFSetTime setTime={item} />,
      renderSectionHeader: ({ section }) => section.name,
      onPress: (venue) => this.props.onNavigate('Venue', venue)
    };

    return <HFSectionList {...props} />;
  }

  content() {
    return (
      <HFParallax image={this.props.band.image_url}>
        <View style={styles.details}>
          {this.name()}
          {this.description()}
        </View>
      </HFParallax>
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
    image_url: PropTypes.string
  }).isRequired,
  sections: PropTypes.array.isRequired
};

export default BandView;
