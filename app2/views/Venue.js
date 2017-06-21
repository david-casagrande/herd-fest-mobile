import React from 'react';
import PropTypes from 'prop-types';
import HFContainer from '../components/HFContainer';
import HFSectionList from '../components/HFSectionList';
import HFSetTime from '../components/HFSetTime';

class VenueView extends React.Component {
  render() {
    return (
      <HFContainer>
        <HFSectionList
          keyProp="id"
          sections={this.props.sections}
          renderItem={({ item }) => <HFSetTime setTime={item} onPress={() => this.props.onNavigate('Band', item.band)} />}
          renderSectionHeader={({ section }) => section.name}
        />
      </HFContainer>
    );
  }
}

VenueView.propTypes = {
  venue: PropTypes.shape({
  }).isRequired,
  sections: PropTypes.array.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default VenueView;
