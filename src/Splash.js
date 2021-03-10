import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

export default class Splash extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.replace('StoryListComponent');
    }, 3000);
  };
  renderSplashContainer = () => {
    return (
      <View style={styles.assignmentTitle}>
        <Text style={styles.assignmentText}> Assignment Project</Text>
      </View>
    );
  };

  render() {
    return (
      <ImageBackground
        resizeMode="contain"
        source={require('./Image/Splash.jpg')}
        style={styles.image}>
        <SafeAreaView style={styles.container}>
          {this.renderSplashContainer()}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignmentTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignmentText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
