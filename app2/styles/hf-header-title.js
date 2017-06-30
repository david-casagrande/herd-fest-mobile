import { StyleSheet, Platform } from 'react-native';

const BASE = {
  color: 'rgba(0, 0, 0, .9)',
  textAlign: 'center'
};

const title = Object.assign({}, BASE, {
  fontSize: 16
});

const sub = Object.assign({}, BASE, {
  fontSize: 13
});

export default StyleSheet.create({ title, sub });
