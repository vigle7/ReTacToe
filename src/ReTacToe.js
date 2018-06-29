import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Button
} from 'react-native';
import Board from './Board';
import styles from './Style';
import codePush from "react-native-code-push";

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

class ReTacToe extends Component {
  constructor() {
    super()
    this.state = {
      checkUp: false
    }
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  componentDidMount() {
    codePush.checkForUpdate()
      .then((update) => {
        if (!update) {
          //console.log("The app is up to date!");
        } else {
          this.setState({ checkUp: true })
        }
      });
  }

  onButtonPress() {
    codePush.sync({
      updateDialog: false,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }

  render() {
    return (
      (
        this.state.checkUp ?
          <View style={{ marginTop: 300 }}>
            <Button
              onPress={this.onButtonPress}
              title="檢查更新"
              style={{
                backgroundColor: "blue",
                width: 300,
                height: 45,
                borderWidth: 1,
                borderRadius: 5
              }}
            />
          </View>
          :
          <View style={styles.rootContainer}>
            <StatusBar backgroundColor="#0077c2" />
            <View style={styles.displayContainer}>
              <Text style={styles.appsTitle}>井字遊戲</Text>
              <Board />
            </View>
          </View>
      )
    );
  }
}

ReTacToe = codePush(codePushOptions)(ReTacToe);
AppRegistry.registerComponent('ReTacToe', () => ReTacToe);