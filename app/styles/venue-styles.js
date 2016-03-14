import container from './components/container';

const venueStyles = {
  container: Object.assign({
    justifyContent: 'center',
    alignItems: 'center'
  }, container.container),
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    color: '#333333',
    marginBottom: 5
  },
  image: {
    height: 200
  }
};

export default venueStyles;
