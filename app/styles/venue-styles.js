import container from './components/container';
import colors from './components/colors';
import fontSizes from './components/font-sizes';

const venueStyles = {
  venueAddressContainer: {
    height: 40
  },
  venueAddressFlexContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  venueAddress: {
    color: colors.secondary,
    fontSize: fontSizes.large
  },
  venueLink: {
    color: colors.primary,
    fontSize: fontSizes.large
  }
};

export default Object.assign({}, container, venueStyles) ;
