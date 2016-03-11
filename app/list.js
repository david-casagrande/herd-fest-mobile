import React from 'react-native';

import listStyles from './styles/list-styles';
import utils from './utils';

const Component = React.Component;
const ListView = React.ListView;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(listStyles);

function dataSource(props) {
  const ds = new ListView.DataSource({ rowHasChanged: utils.notEqual });
  return { dataSource: ds.cloneWithRows(props.dataSource || []) };
}

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = dataSource(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.name}</Text>}
        />
      </View>
    );
  }
}
