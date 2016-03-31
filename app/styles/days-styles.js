import colors from './components/colors';
import container from './components/container';
import React from 'react';

const StyleSheet = React.StyleSheet;

const dayLinkMargin = 0;
const daysPadding = 0;

const days = {
  flex: 1,
  paddingLeft: daysPadding,
  paddingRight: daysPadding,
  paddingBottom: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const dayLink = {
  flex: 1,
  marginLeft: dayLinkMargin,
  marginRight: dayLinkMargin,
  // backgroundColor: colors.lightGrey,
  // borderColor: colors.primary,
  // borderWidth: 1,
  borderLeftColor: colors.primary,
  borderLeftWidth: 0.5,
  borderRightColor: colors.primary,
  borderRightWidth: 0.5,
  borderTopColor: colors.primary,
  borderTopWidth: 1,
  borderBottomColor: colors.primary,
  borderBottomWidth: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 34
};

const dayLinkActive = {
  backgroundColor: colors.primary
};

const dayText = {
  fontSize: 11,
  color: colors.primary,
  fontWeight: '600'
};

const dayTextActive = {
  color: '#fff'
};

const dayStyles = {
  days,
  dayLink,
  dayText,
  dayLinkActive,
  dayTextActive
};

export default Object.assign(dayStyles, container);
