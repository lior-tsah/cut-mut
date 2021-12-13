import React from 'react';
import {View, Image, Button, Text, Dimensions, StyleSheet} from 'react-native';

const logoURL =
  'https://wp-assets.futurism.com/2014/05/rock-paper-scissors.jpg';
const winningURL =
  'https://img.freepik.com/free-vector/you-win-lettering-pop-art-text-banner_185004-60.jpg?size=626&ext=jpg';

class StartMenu extends React.Component {
  render() {
    return (
      <View
        flexDirection="column"
        style={{
          backgroundColor: '#ff4e00',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'yellow',
            fontSize: 72,
            fontFamily: 'monospace',
          }}>
          Cut Mat
        </Text>
        <Image source={{uri: logoURL}} style={styles.winning} />
        <View
          style={{
            width: '50%',
            height: 'auto',
          }}></View>
        <View style={{marginBottom: 15}}>
          <Button
            title="One Player Game"
            onPress={this.props.startOnePlayerGame}
            color="green"
          />
        </View>
        <View style={{marginBottom: 15}}>
          <Button
            title="Two Players Game"
            onPress={this.props.startTwoPlayerGame}
            color="green"
          />
        </View>
        <View style={{marginBottom: 15}}>
          <Button
            title="Game Settings"
            onPress={this.props.showRules}
            color="blue"
          />
        </View>
      </View>
    );
  }
}
export {StartMenu};

const styles = StyleSheet.create({
  winning: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});
