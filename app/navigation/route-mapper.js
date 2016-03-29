import React from 'react-native';

// const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;

import navStyles from '../styles/nav-styles';

// class NavButton extends React.Component {
//   render() {
//     return (
//       <TouchableHighlight>
//         style={styles.button}
//         underlayColor="#B5B5B5"
//         onPress={this.props.onPress}>
//         <Text style={styles.buttonText}>{this.props.text}</Text>
//       </TouchableHighlight>
//     );
//   }
// }

const styles = StyleSheet.create(navStyles);

// all methods get route, navigator, index, navState arguments

const NavigationRouteMapper = {
  LeftButton: function leftButton(route, navigator, index) {
    if (index < 1) {
      return null;
    }

    // const previousRoute = navState.routeStack[index - 1];

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function rightButton() {
    // if(index < 1) {
    //   return null;
    // }
    // return (
    //   <TouchableOpacity
    //     onPress={() => navigator.push()}
    //     style={styles.navBarRightButton}>
    //     <Text style={[styles.navBarText, styles.navBarButtonText]}>
    //       Next
    //     </Text>
    //   </TouchableOpacity>
    // );
  },

  Title: function title(route, navigator, index) {
    if (index < 1) {
      return null;
    }
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  }
};

export default NavigationRouteMapper;
