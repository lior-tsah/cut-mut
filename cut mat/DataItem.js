import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {data} from './Data.js';

var flexContainer = 1;
var colorContainer;
class DataItem extends React.Component {
  openOptions = () => {
    this.props.handlePressItem(this.props.item);
  };
  render() {
    var cTeam = 'silver';
    var temp;
    if (this.props.item.team == 'A') {
      cTeam = 'blue';
    } else if (this.props.item.team == 'B') {
      cTeam = 'red';
    }
    temp = cTeam;

    if (this.props.item.isOption) {
      cTeam = 'yellow';
    } else {
      cTeam = temp;
    }
    let isValid =
      this.props.isRedTurn == (this.props.item.team == 'B') ||
      !this.props.isRedTurn == (this.props.item.team == 'A') ||
      this.props.item.isOption;
    if (
      (this.props.item.Kingdom == 'A' || this.props.item.Kingdom == 'B') &&
      this.props.item.imageUrl == null
    ) {
      this.props.drawKingdom(this.props.item);
    }
    return (
      <View
        style={{
          flex: this.props.index % 2 == 1 ? 3 : 1,
          height: Dimensions.get('window').width / 8.2,
          marginRight: 1,
          marginTop: 8,
          marginBottom: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: this.props.index % 2 == 0 ? '#f1e5ac' : cTeam,
        }}>
        <View
          style={
            this.props.item.press ? stylesItems.press : stylesItems.unPress
          }
          pointerEvents={this.props.item.valid && isValid ? 'auto' : 'none'}>
          <TouchableOpacity
            style={{width: '100%', height: '100%'}}
            activeOpacity={0.5}
            onPress={this.openOptions}>
            <Image
              source={{uri: this.props.item.imageUrl}}
              style={stylesItems.item}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export {DataItem};

const stylesItems = StyleSheet.create({
  unPress: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 0,
  },
  press: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 8,
  },
  item: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
