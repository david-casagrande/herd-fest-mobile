import spacing from '../_spacing';
import colors from '../_colors';
import fontSizes from '../_font-sizes';

const image = {
  height: 200,
  backgroundColor: '#eee'
};

const details = {
  padding: spacing.primary
};

const name = {
  color: colors.secondary,
  fontSize: fontSizes.large,
  paddingTop: 2,
  fontWeight: 'bold'
};

const description = {
  color: colors.secondary,
  fontSize: fontSizes.medium,
  paddingBottom: spacing.primary
};

export default { image, details, name, description };
