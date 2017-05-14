/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry
} from 'react-native';

import TimerWrapper from './app/App';

const App = () => (
  <TimerWrapper />
)

AppRegistry.registerComponent('Timer', () => App);
