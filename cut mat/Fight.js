import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const numColumns = 7;

class Fight extends React.Component {
  render() {
      this.props.stopFight();
    return (
      <Image
        source={{uri: this.props.fightUrl}}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'center',
          resizeMode: 'contain',
        }}
      />
    );
  }
}

export {Fight};
