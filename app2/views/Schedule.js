import React from 'react';
import PropTypes from 'prop-types';
import HFContainer from '../components/HFContainer';
import HFSectionList from '../components/HFSectionList';
import HFSetTime from '../components/HFSetTime';

class ScheduleView extends React.Component {
  render() {
    return (
      <HFContainer>
        <HFSectionList
          keyProp="id"
          tintColor={this.props.color}
          sections={this.props.sections}
          renderItem={({ item }) => <HFSetTime setTime={item} tintColor={this.props.color} />}
          renderSectionHeader={({ section }) => section.name}
          onPress={(venue) => this.props.onNavigate('Venue', venue)}
        />
      </HFContainer>
    );
  }
}

ScheduleView.propTypes = {
  color: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default ScheduleView;
