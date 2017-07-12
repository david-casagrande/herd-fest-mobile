import React from 'react';
import PropTypes from 'prop-types';
import HFContainer from '../components/HFContainer';
import HFSectionList from '../components/HFSectionList';
import HFSetTime from '../components/HFSetTime';

class ScheduleView extends React.Component {
  render() {
    const { color } = this.props;
    return (
      <HFContainer>
        <HFSectionList
          keyProp="id"
          tintColor={color}
          sections={this.props.sections}
          renderItem={({ item }) => <HFSetTime setTime={item} tintColor={color} onPress={() => this.props.onNavigate('Band', item.band)} />}
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
