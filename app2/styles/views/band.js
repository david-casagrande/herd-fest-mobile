import spacing from '../_spacing';
import colors from '../_colors';
import fontSizes from '../_font-sizes';

const image = {
  height: 200,
  backgroundColor: '#eee',
  marginBottom: 4,
};

const details = {
  padding: spacing.primary
};

const name = {
  color: colors.secondary,
  fontSize: fontSizes.large,
  marginBottom: 4,
  fontWeight: 'bold'
};

const description = {
  color: colors.secondary,
  fontSize: fontSizes.medium,
  paddingBottom: spacing.primary
};

export default { image, details, name, description };
