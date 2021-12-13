import React from 'react';
import {Text, Button, View, ScrollView, Dimensions} from 'react-native';
import {Paragraph} from 'react-native-paper';

const numColumns = 7;

class Rules extends React.Component {
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
            fontSize: 50,
            fontFamily: 'monospace',
          }}>
          Rules
        </Text>
        <View
          style={{
            width: '95%',
            height: '80%',
          }}>
          <ScrollView
            style={{
              height: '80%',
              margin: 10,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 3,
            }}>
            <Text
              style={{
                margin: 7,
                fontWeight: 'bold',
                color: 'yellow',
                fontSize: 17,
                fontFamily: 'monospace',
              }}>
              Goal:{'\n'}
              Kill your opponent's paper or "conquer his kingdom" (this is the
              starting point of the paper) with your paper.{'\n'}{'\n'}
              How to play?{'\n'}
              Each player has 4 cards. In each turn, it is allowed to move with
              only one player, up to 3 steps (each card there is one step). {'\n'}
              Each player has 6 players: one paper king, 2 stone bodyguards, and
              three scissor fighters. {'\n'}
              It is possible to "switch cards" for one turn.{'\n'}{'\n'}
              Queue:{'\n'}
              Choose up to 3 cards of the same type. Then, choose the soldier
              you want to move with. Once selected, you can see on the board
              where the soldier can move. Clicking on the square will move the
              soldier to the selected square.{'\n'}{'\n'}
              Fight:{'\n'}
              The opponent's soldiers can be killed by advancing to their slot
              in the following way: a scissor warrior can kill a paper king, a
              stone guard can kill a scissor warrior, and a paper king can kill
              a stone guard.
            </Text>
          </ScrollView>
        </View>
        <View style={{marginBottom: 15}}>
          <Button
            title="Back"
            onPress={this.props.backToStartMenu}
            color="green"
          />
        </View>
      </View>
    );
  }
}

export {Rules};
