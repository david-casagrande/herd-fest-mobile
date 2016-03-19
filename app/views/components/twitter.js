import React from 'react-native';

import utils from '../../utils';

const Component = React.Component;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars

function tweet(app = true) {
  const host = app ? 'twitter://post?message=' : 'https://twitter.com/intent/tweet?text=';
  const msg = '%23HerdFest2016';
  return `${host}${msg}`;
}

function postToTwitterApp() {
  return utils.link(tweet()).catch(() => postToTwitterWeb());
}

function postToTwitterWeb() {
  return utils.link(tweet(false));
}

export default class Twitter extends Component {
  render() {
    return (
      <TouchableOpacity onPress={postToTwitterApp}>
        <Text>Tweet</Text>
      </TouchableOpacity>
    );
  }
}
