import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import HFParallax from '../components/HFParallax';
import HFContainer from '../components/HFContainer';
import HFSectionList from '../components/HFSectionList';
import HFSetTime from '../components/HFSetTime';
import styles from '../styles/views/band';

class BandView extends React.Component {
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

  setTime({ item, section }) {
    const props = {
      setTime: item,
      showVenue: true,
      tintColor: section.color
    };

    return <HFSetTime {...props} />;
  }

  setTimes() {
    const props = {
      keyProp: 'id',
      sections: this.props.sections,
      static: true,
      renderItem: (info) => this.setTime(info),
      renderSectionHeader: ({ section }) => section.name
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
        {this.setTimes()}
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
