import React from 'react';
import {
  View,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const winningURL =
  'https://img.freepik.com/free-vector/you-win-lettering-pop-art-text-banner_185004-60.jpg?size=626&ext=jpg';
const loseURL =
  'https://previews.123rf.com/images/lkeskinen/lkeskinen1709/lkeskinen170908913/86154548-you-lose-rubber-stamp.jpg';
class EndMenu extends React.Component {
  render() {
    let imgUrl = this.props.isRedWin ? winningURL : loseURL;
    this.props.setData;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Image source={{uri: imgUrl}} style={styles.winning} />
        <Button title="Start again" onPress={this.props.startGame} />
      </View>
    );
  }
}
export {EndMenu};

const styles = StyleSheet.create({
  winning: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});
