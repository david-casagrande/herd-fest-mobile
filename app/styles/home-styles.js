import colors from './components/colors';
import container from './components/container';
import fontSizes from './components/font-sizes';
import padding from './components/padding';

const homeStyles = {
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 260,
    height: 260,
    marginBottom: 24
  },
  days: {
    width: 260
  },
  link: {
    borderColor: colors.primary,
    borderWidth: 2,
    marginBottom: padding.primary,
    paddingTop: padding.primary,
    paddingBottom: padding.primary
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.xlarge
  }
};

export default Object.assign(homeStyles, container);
