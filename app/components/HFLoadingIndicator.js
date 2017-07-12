import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/hf-loading-indicator';

function HFLoadingIndicator() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>💩</Text>
    </View>
  );
}

export default HFLoadingIndicator;
