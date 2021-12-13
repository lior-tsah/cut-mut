import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  Button,
} from 'react-native';
import {CardItem} from './CardItem.js';
import {DataItem} from './DataItem.js';

const numColumns = 7;

class OnePlayerGame extends React.Component {
  render() {
    if (this.props.isRedTurn == false) {
      new Promise(r => setTimeout(r, 2000)).then(() => {
        this.props.makeComputerMove();
      });
    } else {
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: this.props.isRedTurn ? '#FF6347' : '#6A5ACD',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            backgroundColor: 'cyan',
            margin: 10,
          }}
          pointerEvents={'none'}>
          <FlatList
            data={this.props.currCardsBlues}
            renderItem={({item, index}) => {
              if (item.empty === true) {
                return <View style={[styles.item, styles.itemInvisible]} />;
              }
              return (
                <CardItem
                  handlePressCard={this.props.handlePressCard.bind(this)}
                  item={item}
                  index={index}></CardItem>
              );
            }}
            numColumns={numColumns}
          />
        </View>
        <View
          flexDirection="column"
          style={{
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={this.props.Data}
            style={styles.container}
            renderItem={({item, index}) => {
              if (item.empty === true) {
                return <View style={[styles.item, styles.itemInvisible]} />;
              }
              return (
                <DataItem
                  handlePressItem={this.props.handlePressItem.bind(this)}
                  item={item}
                  index={index}
                  isRedTurn={this.props.isRedTurn}
                  drawKingdom={this.props.drawKingdom.bind(this)}></DataItem>
              );
            }}
            numColumns={numColumns}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'pink',
            margin: 10,
          }}
          pointerEvents={this.props.isRedTurn ? 'auto' : 'none'}>
          <FlatList
            data={this.props.currCardsReds}
            renderItem={({item, index}) => {
              if (item.empty === true) {
                return <View style={[styles.item, styles.itemInvisible]} />;
              }
              return (
                <CardItem
                  handlePressCard={this.props.handlePressCard.bind(this)}
                  item={item}
                  index={index}></CardItem>
              );
            }}
            numColumns={numColumns}
          />
        </View>

        <View
          flexDirection="row"
          style={{
            width: '90%',
            height: 'auto',
            marginBottom: 5,
            alignItems: 'center',
            marginLeft: 20,
            justifyContent: 'space-between',
          }}>
          <Button
            disabled={!this.props.isRedTurn}
            title="Switch Cards"
            onPress={this.props.switchCards}
            color="green"
          />
          <Button title="Quit Game" onPress={this.props.quitGame} color="red" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    backgroundColor: '#f1e5ac',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  winning: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});

export {OnePlayerGame};
