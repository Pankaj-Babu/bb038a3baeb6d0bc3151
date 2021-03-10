/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Text} from 'react-native';

//*> Functional Component(Stateless component)
const jsonRawComponent = (navigation) => {
  return (
    <SafeAreaView style={styles.constainer}>
      <Text style={styles.detailText}>
        {JSON.stringify(navigation.route.params.rawData)}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: '#9FE2BF',
  },

  detailText: {
    fontSize: 15,
    padding: 10,
  },
});

export default jsonRawComponent;
