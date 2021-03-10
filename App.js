/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StoryListComponent from './src/StoryListComponent';
import JSONRawComponent from './src/JSONRawComponent';
import Splash from './src/Splash';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StoryListComponent"
            component={StoryListComponent}
            options={() => ({
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#A9A9A9'},
            })}
          />
          <Stack.Screen
            name="JSONRawComponent"
            component={JSONRawComponent}
            options={() => ({
              headerStyle: {backgroundColor: '#ace8c9'},
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
