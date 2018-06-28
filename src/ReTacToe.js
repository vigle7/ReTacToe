import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StatusBar
} from 'react-native';
import Board from './Board';
import styles from './Style';
import codePush from "react-native-code-push";

class ReTacToe extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar backgroundColor="#0077c2" />
        <View style={styles.displayContainer}>
          <Text style={styles.appsTitle}>React Native Tic Tac Toe</Text>
          <Board />
        </View>
      </View>
    );
  }
}

ReTacToe = codePush(ReTacToe);
AppRegistry.registerComponent('ReTacToe', () => ReTacToe);