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
import {data} from './Data.js';
import cloneDeep from 'lodash/cloneDeep';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {OnePlayerGame} from './OnePlayerGame.js';
import {TwoPlayersGame} from './TwoPlayersGame.js';
import {Fight} from './Fight.js';
import {EndMenu} from './EndMenu.js';
import {StartMenu} from './StartMenu.js';
import {Rules} from './Rules.js';

const conqueringURL =
  'https://media0.giphy.com/media/F0uvYzyr2a7Li/giphy.gif?cid=ecf05e478sixv7whisi8tlc0ifsqsm5frh4n2zp8rxw2qwar&rid=giphy.gif&ct=g';
const drawURL =
  'https://i.pinimg.com/originals/e1/e5/55/e1e555776e10182a9d7f07624693c13d.gif';
const paperfightURL =
  'https://thumbs.gfycat.com/IncompleteParallelDeer-size_restricted.gif';
const scissorsfightURL =
  'https://cdn.dribbble.com/users/729829/screenshots/4189148/galshir-cutting-paper-dirbbble.gif';
const stonefightURL =
  'https://64.media.tumblr.com/56d2f087533eab8f037cd32f6855d262/tumblr_ovpvrmzhek1r87g0to2_500.gifv';
const paperURL =
  'https://image.shutterstock.com/image-vector/king-tissue-character-cartoon-style-600w-765586615.jpg';
const scissorsURL =
  'https://ravinternet.org/wp-content/uploads/2018/07/%D7%9E%D7%A1%D7%A4%D7%A8%D7%99%D7%99%D7%9D-488x360.jpg';
const stoneURL =
  'https://image.shutterstock.com/image-vector/cartoon-vector-grumpy-rock-600w-173241479.jpg';
const kingdomURL =
  'https://www.adamtsair.co.il/wp-content/uploads/2015/12/28_800x783.jpg';

var cards = [
  {
    key: 'stone',
    imageUrl: stoneURL,
  },
  {
    key: 'paper',
    imageUrl: paperURL,
  },
  {
    key: 'scissors',
    imageUrl: scissorsURL,
  },
];

const numColumns = 7;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStartGame: false,
      currCardsReds: [],
      currCardsBlues: [],
      chosenCards: 'null',
      isRedTurn: true,
      countCards: 0,
      isInitial: true,
      isChosenItem: false,
      isWin: false,
      isFight: false,
      fightUrl: '',
      Data: cloneDeep(data),
      isTwoPlayerGame: false,
      isRedWin: false,
      isShowRules: false,
    };
  }
  handlePressItem(item) {
    //choose item
    if (!this.state.isChosenItem && item.imageUrl === this.state.chosenCards) {
      item.press = true;
      this.calculateMoveOptions(
        item.row,
        item.column,
        this.state.countCards,
        item.press,
        item.team,
      );
      this.setState({isChosenItem: true});
    }
    //if you want cancel your choice
    else if (item.imageUrl === this.state.chosenCards && item.press) {
      this.setState({isChosenItem: false});
      item.press = false;
      this.state.Data.forEach(e => {
        e.isOption = false;
      });
    }
    //if you make a choice
    else if (item.isOption) {
      this.makeMove(item);
    }
  }
  makeMove(item) {
    var found = this.state.Data.find(element => element.press === true);
    found.press = false;
    this.state.Data.forEach(e => {
      e.isOption = false;
    });
    var tempUrl = found.imageUrl;
    if (
      item.imageUrl == null ||
      (item.Kingdom === found.Kingdom && item.imageUrl === kingdomURL) ||
      (found.imageUrl !== paperURL && item.imageUrl === kingdomURL)
    ) {
      found.imageUrl = null;
      item.imageUrl = tempUrl;
      item.team = found.team;
      found.team = null;
    } else if (
      item.Kingdom &&
      found.imageUrl === paperURL &&
      found.team !== item.Kingdom
    ) {
      this.setState({fightUrl: conqueringURL});
      if (found.team === 'B') {
        this.setState({isRedWin: true});
      } else {
        this.setState({isRedWin: false});
      }
      this.setState({isFight: true});
      setTimeout(() => {
        this.setState({isWin: true});
      }, 4000);
    } else {
      this.handleFight(found, item);
    }
    this.endTurn();
  }
  handleFight(attack, defense) {
    console.log('FIGHT');
    this.chooseFightGif(attack, defense);
    if (
      (attack.imageUrl == scissorsURL && defense.imageUrl == paperURL) ||
      (attack.imageUrl == paperURL && defense.imageUrl == stoneURL) ||
      (attack.imageUrl == stoneURL && defense.imageUrl == scissorsURL)
    ) {
      if (attack.imageUrl == scissorsURL && defense.imageUrl == paperURL) {
        if (attack.team === 'B') {
          this.setState({isRedWin: true});
        } else {
          this.setState({isRedWin: false});
        }
        setTimeout(() => {
          this.setState({isWin: true});
        }, 4000);
      }
      defense.imageUrl = attack.imageUrl;
      defense.team = attack.team;
      attack.team = null;
      attack.imageUrl = null;
    } else if (attack.imageUrl === defense.imageUrl) {
      this.setState({fightUrl: drawURL});
    } else {
      if (attack.imageUrl == paperURL && defense.imageUrl == scissorsURL) {
        if (attack.team === 'B') {
          this.setState({isRedWin: false});
        } else {
          this.setState({isRedWin: true});
        }
        setTimeout(() => {
          this.setState({isWin: true});
        }, 4000);
      }
      attack.imageUrl = null;
      attack.team = null;
    }

    this.setState({isFight: true});
  }

  chooseFightGif(attack, defense) {
    if (
      (attack.imageUrl == scissorsURL && defense.imageUrl == paperURL) ||
      (attack.imageUrl == paperURL && defense.imageUrl == scissorsURL)
    ) {
      this.setState({fightUrl: scissorsfightURL});
    } else if (
      (attack.imageUrl == scissorsURL && defense.imageUrl == stoneURL) ||
      (attack.imageUrl == stoneURL && defense.imageUrl == scissorsURL)
    ) {
      this.setState({fightUrl: stonefightURL});
    } else if (
      (attack.imageUrl == paperURL && defense.imageUrl == stoneURL) ||
      (attack.imageUrl == stoneURL && defense.imageUrl == paperURL)
    ) {
      this.setState({fightUrl: paperfightURL});
    }
  }
  calculateMoveOptions(row, column, countCards, isPress, team) {
    if (countCards == 0) {
      if (row > 0 && column > 0 && row < 8 && column < 8) {
        this.replaceSquereInData(row, column, isPress, team);
      }
    } else if (row > 0 && column > 0 && row < 8 && column < 8) {
      this.calculateMoveOptions(
        row + 1,
        column + 1,
        countCards - 1,
        isPress,
        team,
      );
      this.calculateMoveOptions(
        row + 1,
        column - 1,
        countCards - 1,
        isPress,
        team,
      );
      this.calculateMoveOptions(
        row - 1,
        column + 1,
        countCards - 1,
        isPress,
        team,
      );
      this.calculateMoveOptions(
        row - 1,
        column - 1,
        countCards - 1,
        isPress,
        team,
      );
    }
  }
  replaceSquereInData(row, column, isPress, team) {
    var found = this.state.Data.filter(
      element =>
        element.row === row &&
        element.column == column &&
        element.team !== team,
    );
    found.forEach(element => {
      element.isOption = true;
      element.valid = true;
    });

    this.forceUpdate();
  }

  handlePressCard(item) {
    if (this.state.countCards === 0) {
      this.state.chosenCards = item.card.imageUrl;
    }
    if (this.state.chosenCards === item.card.imageUrl) {
      if (this.state.countCards < 3) {
        item.press = !item.press;
        if (item.press) {
          this.state.countCards++;
        } else {
          this.state.countCards--;
        }
      } else if (item.press) {
        item.press = !item.press;
        this.state.countCards--;
      }
    }
    this.state.Data.forEach(e => {
      e.isOption = false;
      e.press = false;
    });

    if (this.state.countCards === 0) {
      this.setState({chosenCards: ''});
    }
    this.setState({isChosenItem: false});
  }
  initCards() {
    var x;
    var y;
    for (let i = 0; i < 4; i++) {
      x = Math.floor(Math.random() * 3);
      y = Math.floor(Math.random() * 3);
      this.state.currCardsReds.push({
        card: cards[x],
        press: false,
      });
      this.state.currCardsBlues.push({
        card: cards[y],
        press: false,
      });
    }
  }

  switchCards = () => {
    this.state.currCardsReds = [];
    this.state.currCardsBlues = [];
    this.initCards();
    this.endTurn();
  };

  endTurn = () => {
    var i = this.state.isRedTurn;
    var found;
    this.state.Data.forEach(element => {
      element.isOption = false;
      element.press = false;
    });
    if (i) {
      found = this.state.currCardsReds.filter(
        element => element.press === true,
      );
    } else {
      found = this.state.currCardsBlues.filter(
        element => element.press === true,
      );
    }
    found.forEach(e => {
      var x = Math.floor(Math.random() * 3);
      e.card = cards[x];
      e.press = false;
    });
    this.setState({countCards: 0});
    this.setState({isRedTurn: !i});
  };
  setData = () => {
    this.setState({Data: cloneDeep(data)});
  };
  startTwoPlayerGame = () => {
    this.setState({isTwoPlayerGame: true});
    this.startGame();
  };
  startOnePlayerGame = () => {
    this.setState({isTwoPlayerGame: false});
    this.startGame();
  };
  startGame = () => {
    this.setState({isStartGame: true});
    this.setState({isRedTurn: true});
    this.setState({isWin: false});
    this.setState({currCardsReds: []});
    this.setState({currCardsBlues: []});
    this.setState({chosenCards: 'null'});
    this.setState({Data: cloneDeep(data)});
    this.setState({isInitial: true});
    this.setState({countCards: 0});
    this.setState({isChosenItem: false});
    this.setState({isFight: false});
    this.setState({fightUrl: ''});
  };

  drawKingdom = item => {
    item.imageUrl = kingdomURL;
  };
  quitGame = () => {
    this.setState({isStartGame: false});
  };
  stopFight = () => {
    setTimeout(() => {
      this.setState({isFight: false});
    }, 4000);
  };
  setRedTurn = () => {
    this.setState({isRedTurn: true});
  };
  makeComputerMove = () => {
    var stonesA = this.state.Data.filter(
      element => element.imageUrl === stoneURL && element.team === 'A',
    );
    var paperA = this.state.Data.find(
      element => element.imageUrl === paperURL && element.team === 'A',
    );
    var scissorsB = this.state.Data.filter(
      element => element.imageUrl === scissorsURL && element.team === 'B',
    );
    var paperB = this.state.Data.find(
      element => element.imageUrl === paperURL && element.team === 'B',
    );
    var scissorsA = this.state.Data.filter(
      element => element.imageUrl === scissorsURL && element.team === 'A',
    );
    var stonesB = this.state.Data.filter(
      element => element.imageUrl === stoneURL && element.team === 'B',
    );
    var stonesCardsA = this.state.currCardsBlues.filter(
      element => element.card.imageUrl === stoneURL,
    );
    var paperCardsA = this.state.currCardsBlues.filter(
      element => element.card.imageUrl === paperURL,
    );
    var scissorsCardsB = this.state.currCardsReds.filter(
      element => element.card.imageUrl === scissorsURL,
    );
    var scissorsCardsA = this.state.currCardsBlues.filter(
      element => element.card.imageUrl === scissorsURL,
    );
    if (!this.state.isRedTurn) {
      if (this.isInDanger('B', 'A', this.state.currCardsBlues)) {
        //computer can win
        this.makeWinMove(paperB, scissorsA, scissorsCardsA);
      } else if (this.isInDanger('A', 'B', this.state.currCardsReds)) {
        // the paper in danger
        if (
          this.canEatDanger(
            stonesA,
            scissorsB,
            paperA,
            this.state.currCardsBlues,
            this.state.currCardsReds,
          )
        ) {
          this.eatDanger(stonesA, scissorsB, paperA, stonesCardsA);
        } else if (
          this.canRun(
            scissorsB,
            paperA,
            paperCardsA,
            scissorsCardsB,
            this.state.currCardsBlues,
            this.state.currCardsReds,
          )
        ) {
          this.Run(
            scissorsB,
            paperA,
            paperCardsA,
            scissorsCardsB,
            this.state.currCardsBlues,
            this.state.currCardsReds,
          );
        } else this.switchCards();
      } else if (
        this.canEat(
          stonesA,
          paperA,
          scissorsB,
          stonesB,
          stonesCardsA,
          paperCardsA,
        )
      ) {
        this.eat(
          stonesA,
          paperA,
          scissorsB,
          stonesB,
          stonesCardsA,
          paperCardsA,
          scissorsCardsB,
        );
      } else {
        this.makeRandomMove();
      }
    }
  };
  makeRandomMove() {
    let cardsWithoutPaper = this.state.currCardsBlues.filter(
      element => element.card.imageUrl !== paperURL,
    );
    if (cardsWithoutPaper.length > 0) {
      let i = Math.floor(Math.random() * cardsWithoutPaper.length);
      let randArrayCards = cardsWithoutPaper.filter(
        element => element.card.imageUrl === cardsWithoutPaper[i].card.imageUrl,
      );
      let randNumofCards = Math.floor(
        Math.random() * randArrayCards.length + 1,
      );
      randNumofCards = Math.max(randNumofCards, 1);
      for (let x = 0; x < randNumofCards; x++) {
        randArrayCards[x].press = true;
      }
      let itemToMove = cardsWithoutPaper[i].card.imageUrl;
      let item = this.state.Data.find(
        element => element.imageUrl === itemToMove && element.team === 'A',
      );
      if (item) {
        item.press = true;
        this.calculateMoveOptions(
          item.row,
          item.column,
          randNumofCards,
          true,
          'A',
        );
        var options = this.state.Data.filter(element => element.isOption);
        if (options.length > 0) {
          let randOption = Math.floor(Math.random() * options.length);
          this.makeMove(options[randOption]);
        } else {
          this.switchCards();
        }
        this.state.Data.forEach(element => {
          element.press = false;
        });
      } else {
        this.switchCards();
      }
      this.forceUpdate();
    } else {
      this.switchCards();
    }
  }
  canEat(stonesA, paperA, scissorsB, stonesB, stonesCardsA, paperCardsA) {
    let numOfSteps;
    let flg = false;
    stonesA.forEach(element => {
      numOfSteps = this.findnumofSteps(element, scissorsB);
      if (numOfSteps <= stonesCardsA.length && numOfSteps < 4) {
        flg = true;
      }
    });

    numOfSteps = this.findnumofSteps(paperA, stonesB);
    if (numOfSteps <= paperCardsA.length && numOfSteps < 4) {
      flg = true;
    }
    return flg;
  }
  eat(
    stonesA,
    paperA,
    scissorsB,
    stonesB,
    stonesCardsA,
    paperCardsA,
    scissorsCardsB,
  ) {
    let numOfSteps;
    let item;
    let flg = true;
    stonesA.forEach(element => {
      numOfSteps = this.findnumofSteps(element, scissorsB);
      if (numOfSteps <= stonesCardsA.length && flg) {
        for (let i = 0; i < numOfSteps; i++) {
          stonesCardsA[i].press = true;
        }
        item = this.findDanger(element, scissorsB);
        this.handleFight(element, item);
        flg = false;
      }
    });
    numOfSteps = this.findnumofSteps(paperA, stonesB);
    if (numOfSteps <= paperCardsA.length && flg) {
      item = this.findDanger(paperA, stonesB);
      if (!this.isDangerEat(item, scissorsB, scissorsCardsB)) {
        for (let i = 0; i < numOfSteps; i++) {
          paperCardsA[i].press = true;
        }
        this.handleFight(paperA, item);
        flg = false;
      } else {
        this.makeRandomMove();
        this.endTurn();
      }
    }
    this.endTurn();
  }
  isInDanger(team1, team2, cardsTeam2) {
    let flg = false;
    var paperA = this.state.Data.find(
      element => element.imageUrl === paperURL && element.team === team1,
    );
    var scissorsB = this.state.Data.filter(
      element => element.imageUrl === scissorsURL && element.team === team2,
    );
    let countScissors = 0;
    cardsTeam2.forEach(e => {
      if (e.card.imageUrl === scissorsURL) {
        countScissors++;
      }
    });
    scissorsB.forEach(element => {
      if (
        Math.abs(paperA.row - element.row) <= countScissors &&
        Math.abs(paperA.column - element.column) <= countScissors
      ) {
        flg = true;
      }
    });
    return flg;
  }
  isDangerEat(stoneB, scissorsB, scissorsCardsB) {
    let flg = false;
    let numOfSteps = this.findnumofSteps(stoneB, scissorsB);
    if (numOfSteps <= scissorsCardsB.length) {
      flg = true;
    }
    return flg;
  }
  makeWinMove(paperB, scissorsA, scissorsCardsA) {
    let numOfSteps = this.findnumofSteps(paperB, scissorsA);
    let scissorsItem = scissorsA.find(
      element =>
        (Math.abs(paperB.row - element.row) <= numOfSteps &&
          Math.abs(paperB.column - element.column) <= numOfSteps &&
          Math.abs(paperB.row - element.row) == numOfSteps) ||
        Math.abs(paperB.column - element.column) == numOfSteps,
    );
    scissorsItem.press = true;
    this.handleFight(scissorsItem, paperB);
    this.endTurn();
  }
  findnumofSteps(elementA, arrayB) {
    let max;
    let numOfSteps = 4;
    let tempStep;
    arrayB.forEach(element => {
      max = Math.max(
        Math.abs(elementA.row - element.row),
        Math.abs(elementA.column - element.column),
      );
      numOfSteps = Math.min(numOfSteps, max);
    });
    return numOfSteps;
  }
  findDanger(elementA, arrayB) {
    let max;
    let item = null;
    arrayB.forEach(element => {
      max = Math.max(
        Math.abs(elementA.row - element.row),
        Math.abs(elementA.column - element.column),
      );
      if (max < 4) item = element;
    });
    return item;
  }
  canEatDanger(stonesA, scissorsB, paperA, cardsTeam1, cardsTeam2) {
    let flg;
    let danger = this.findDanger(paperA, scissorsB);
    let numOfSteps = 4;
    if (danger) numOfSteps = this.findnumofSteps(danger, stonesA);
    if (
      cardsTeam1.filter(element => element.card.imageUrl === stoneURL).length >=
        numOfSteps &&
      numOfSteps <= 3
    ) {
      flg = true;
    } else flg = false;
    return flg;
  }
  eatDanger(stonesA, scissorsB, paperA, stonesCardsA) {
    let danger = this.findDanger(paperA, scissorsB);
    let numOfSteps = this.findnumofSteps(danger, stonesA);

    for (let i = 0; i < numOfSteps; i++) {
      stonesCardsA[i].press = true;
    }
    let stoneItem = stonesA.find(
      element =>
        (Math.abs(danger.row - element.row) <= numOfSteps &&
          Math.abs(danger.column - element.column) <= numOfSteps &&
          Math.abs(danger.row - element.row) == numOfSteps) ||
        Math.abs(danger.column - element.column) == numOfSteps,
    );
    stoneItem.press = true;
    this.makeMove(danger);
  }

  canRun(
    scissorsB,
    paperA,
    paperCardsA,
    scissorsCardsB,
    cardsTeam1,
    cardsTeam2,
  ) {
    let flg = false;
    let tempStep;
    let steps = 0;
    let minStep = 4;

    let danger = this.findDanger(paperA, scissorsB);

    for (let i = 1; i <= paperCardsA.length; i++) {
      this.calculateMoveOptions(
        paperA.row,
        paperA.column,
        i,
        true,
        paperA.team,
      );
    }
    var options = this.state.Data.filter(element => element.isOption);

    options.forEach(option => {
      minStep = this.findnumofSteps(option, scissorsB);
      if (minStep > scissorsCardsB.length || minStep > 3) flg = true;
    });

    this.state.Data.forEach(e => {
      e.isOption = false;
    });
    return flg;
  }

  Run(scissorsB, paperA, paperCardsA, scissorsCardsB, cardsTeam1, cardsTeam2) {
    let flg = true;
    let tempStep;
    let steps = 0;
    let minStep = 4;
    let item;
    let danger = this.findDanger(paperA, scissorsB);
    paperA.press = true;
    let maxStep;
    maxStep = Math.min(paperCardsA.length, 3);
    for (let i = 1; i <= maxStep; i++) {
      this.calculateMoveOptions(
        paperA.row,
        paperA.column,
        i,
        true,
        paperA.team,
      );
    }
    var options = this.state.Data.filter(element => element.isOption);
    options.forEach(option => {
      minStep = this.findnumofSteps(option, scissorsB);
      if ((minStep > scissorsCardsB.length || minStep > 3) && flg) {
        steps = Math.max(
          Math.abs(paperA.row - option.row),
          Math.abs(paperA.column - option.column),
        );
        for (let i = 0; i < steps; i++) {
          paperCardsA[i].press = true;
        }
        item = option;
      }
    });
    this.makeMove(item);
  }
  showRules() {
    this.setState({isShowRules: true});
  }
  backToStartMenu() {
    this.setState({isShowRules: false});
  }
  render() {
    if (!this.state.isShowRules) {
      if (this.state.isStartGame) {
        if (this.state.isInitial) {
          this.initCards();
          this.state.isInitial = false;
        }
        if (!(this.state.isWin || this.state.isFight)) {
          if (!this.state.isTwoPlayerGame) {
            return (
              <OnePlayerGame
                isRedTurn={this.state.isRedTurn}
                currCardsReds={this.state.currCardsReds}
                currCardsBlues={this.state.currCardsBlues}
                Data={this.state.Data}
                handlePressCard={this.handlePressCard.bind(this)}
                handlePressItem={this.handlePressItem.bind(this)}
                drawKingdom={this.drawKingdom.bind(this)}
                quitGame={this.quitGame.bind(this)}
                switchCards={this.switchCards.bind(this)}
                setRedTurn={this.setRedTurn}
                makeComputerMove={this.makeComputerMove}
              />
            );
          } else {
            return (
              <TwoPlayersGame
                isRedTurn={this.state.isRedTurn}
                currCardsReds={this.state.currCardsReds}
                currCardsBlues={this.state.currCardsBlues}
                Data={this.state.Data}
                handlePressCard={this.handlePressCard.bind(this)}
                handlePressItem={this.handlePressItem.bind(this)}
                drawKingdom={this.drawKingdom.bind(this)}
                quitGame={this.quitGame.bind(this)}
                switchCards={this.switchCards.bind(this)}
              />
            );
          }
        } else if (this.state.isWin) {
          return (
            <EndMenu
              startGame={this.startGame.bind(this)}
              setData={this.setData.bind(this)}
              isRedWin={this.state.isRedWin}
            />
          );
        } else {
          return (
            <Fight
              fightUrl={this.state.fightUrl}
              stopFight={this.stopFight.bind(this)}
            />
          );
        }
      } else {
        return (
          <StartMenu
            startTwoPlayerGame={this.startTwoPlayerGame.bind(this)}
            startOnePlayerGame={this.startOnePlayerGame.bind(this)}
            showRules={this.showRules.bind(this)}
          />
        );
      }
    } else {
      return <Rules backToStartMenu={this.backToStartMenu.bind(this)} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    flex: 2,
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
