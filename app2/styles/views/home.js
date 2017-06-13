import { Dimensions } from 'react-native';
import colors from '../_colors';
import spacing from '../_spacing';
import fontSizes from '../_font-sizes';

const DIMENSIONS = Dimensions.get('window');
const OFFSET = 80;
const IMAGE_WIDTH = DIMENSIONS.width - OFFSET;

const content = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

const image = {
  width: IMAGE_WIDTH,
  height: IMAGE_WIDTH,
  marginBottom: 24
};

const link = {
  borderColor: colors.primary,
  borderWidth: 2,
  marginBottom: spacing.primary,
  paddingTop: spacing.primary,
  paddingBottom: spacing.primary
};

const links = {
  width: IMAGE_WIDTH
};

const linkText = {
  color: colors.primary,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: fontSizes.large
};

export default { image, content, links, link, linkText };
