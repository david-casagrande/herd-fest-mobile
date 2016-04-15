import colors from './components/colors';
import container from './components/container';
import fontSizes from './components/font-sizes';

const dayLinkMargin = 0;
const daysPadding = 0;

const days = {
  flex: 1,
  paddingLeft: daysPadding,
  paddingRight: daysPadding,
  paddingBottom: 0,
  flexDirection: 'row',
  justifyContent: 'space-between'
};

const dayLink = {
  flex: 1,
  marginLeft: dayLinkMargin,
  marginRight: dayLinkMargin,
  borderColor: colors.primary,
  borderLeftWidth: 0.5,
  borderRightWidth: 0.5,
  borderTopWidth: 1,
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
  fontSize: fontSizes.verySmall,
  color: colors.primary,
  fontWeight: '600'
};

const dayTextActive = {
  color: colors.white
};

const dayStyles = {
  days,
  dayLink,
  dayText,
  dayLinkActive,
  dayTextActive
};

export default Object.assign(dayStyles, container);
