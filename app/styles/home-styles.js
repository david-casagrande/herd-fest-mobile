import container from './components/container';
import colors from './components/colors';

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
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  }
};

export default Object.assign(homeStyles, container);
