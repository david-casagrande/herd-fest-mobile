import React from 'react';
import PropTypes from 'prop-types';
import HomeView from '../views/Home';

class HomeContainer extends React.Component {
  render() {
    return <HomeView onNavigate={(url) => this.props.navigation.navigate(url)} />;
  }
}

HomeContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default HomeContainer;
