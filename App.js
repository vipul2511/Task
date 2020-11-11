
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MainStackNavigator from './src/MainStackNavigator';


class App extends Component {
  render() { 
    return <MainStackNavigator />;
  }
}

const styles = StyleSheet.create({});

export default App;