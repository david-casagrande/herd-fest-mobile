import React from 'react';
import PropTypes from 'prop-types';
import HFContainer from '../components/HFContainer';
import HFSectionList from '../components/HFSectionList';
import HFSetTime from '../components/HFSetTime';

class MyScheduleView extends React.Component {
  renderItem({ item, section }) {
    const props = {
      setTime: item,
      tintColor: section.color,
      showVenueAndBand: true,
      onPress: () => this.props.onNavigate('Band', item.band)
    };

    return <HFSetTime {...props} />;
  }

  render() {
    return (
      <HFContainer>
        <HFSectionList
          keyProp="id"
          sections={this.props.sections}
          renderItem={(info) => this.renderItem(info)}
          renderSectionHeader={({ section }) => section.name}
        />
      </HFContainer>
    );
  }
}

MyScheduleView.propTypes = {
  sections: PropTypes.array.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default MyScheduleView;
