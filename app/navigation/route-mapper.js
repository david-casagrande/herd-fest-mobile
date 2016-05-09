import LeftButtonNav from './left-button-nav';
import React from 'react';
import RightButtonNav from './right-button-nav';
import TitleNav from './title-nav';

const NavigationRouteMapper = {
  LeftButton: function leftButton(route, navigator, index) {
    return <LeftButtonNav route={route} navigator={navigator} index={index} />;
  },

  RightButton: function rightButton(route, navigator, index) {
    return <RightButtonNav route={route} navigator={navigator} index={index} />;
  },

  Title: function title(route, navigator, index) {
    return <TitleNav route={route} navigator={navigator} index={index} />;
  }
};

export default NavigationRouteMapper;
