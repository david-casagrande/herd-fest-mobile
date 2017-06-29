import colors from './_colors';
import fontSizes from './_font-sizes';

const container = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const startTime = {
  width: 78,
  color: colors.primary,
  textAlign: 'center',
  fontSize: fontSizes.medium
};

const label = {
  flex: 1
};

const labelText = {
  color: colors.secondary,
  textAlign: 'left',
  fontSize: fontSizes.medium
};

const labelTextSecondary = {
  color: colors.secondary,
  textAlign: 'left',
  fontSize: fontSizes.small
};

export default { container, startTime, label, labelText, labelTextSecondary };
