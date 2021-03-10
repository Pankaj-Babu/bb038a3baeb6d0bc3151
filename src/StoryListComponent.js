/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

class StoryListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsData: [],
      pageCount: 0,
      limit: 20,
      loading: true,
      pageLoader: false,
      pullToRefresh: false,
      onEndReachedCalledDuringMomentum: true,
      lastLoadCount: 0,
      filterData: this.props.insightsFilter,
      showEmptyView: false,
    };
  }

  componentDidMount() {
    //*> Fetch Initial Request
    this.fetchPostsRequest();
    //*> Fetch Request after every 10 seconds
    setInterval(() => {
      this.setState({pageCount: this.state.pageCount + 1}, () => {
        this.fetchPostsRequest();
      });
    }, 10000);
  }

  //*> Fetch Story Data
  fetchPostsRequest = async () => {
    let localStoryList = this.state.postsData;
    try {
      let response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.pageCount}`,
      );
      let json = await response.json();

      this.setState({
        postsData: this.state.postsData.concat(json.hits),
        pageLoader: false,
        lastLoadCount: this.state.postsData.concat(json.hits).length,
        onEndReachedCalledDuringMomentum:
          this.state.postsData.concat(json.hits).length >= this.state.limit
            ? true
            : false,
        notFinalLoad:
          this.state.postsData.concat(json.hits).length >= this.state.limit
            ? true
            : false,
      });
      return;
    } catch (error) {
      console.error(error);
    }
  };

  //*> On End Reached of the List Fetch data again

  onEndReached = () => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this.setState({onEndReachedCalledDuringMomentum: true}, () => {
        setTimeout(() => {
          if (
            this.state.lastLoadCount >= this.state.limit &&
            this.state.notFinalLoad
          ) {
            this.setState(
              {
                pageLoader: true,
                pageCount: this.state.pageCount + 1,
              },
              () => {
                // Then we fetch more data;
                this.fetchPostsRequest();
              },
            );
          }
        }, 1500);
      });
    }
  };

  // Key Extractor
  _keyExtractor = (item, index) => item.id;

  // Check if list has started scrolling
  _onMomentumScrollBegin = () =>
    this.setState({onEndReachedCalledDuringMomentum: false});

  //*> On Navigate to story detail screen
  onPressCellRow = (item) => {
    this.props.navigation.navigate('JSONRawComponent', {rawData: item});
  };

  renderCellData(item) {
    return (
      <TouchableOpacity
        onPress={() => this.onPressCellRow(item)}
        style={styles.cellContainer}>
        <Text style={styles.data}>Title: {item.title}</Text>
        <Text style={styles.data}>URL: {item.url}</Text>
        <Text style={styles.data}>Created at: {item.created_at}</Text>
        <Text style={styles.data}>Author: {item.author}</Text>
      </TouchableOpacity>
    );
  }

  // Footer loader for Pagination
  _renderSearchResultsFooter = () => {
    return this.state.pageLoader ? (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={'#000000'} />
      </View>
    ) : null;
  };

  renderPostsLists() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.postsData}
          renderItem={({item}) => this.renderCellData(item)}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          contentContainerStyle={styles.contentContainer}
          onEndReachedThreshold={0.01}
          onEndReached={() => this.onEndReached()}
          ListFooterComponent={this._renderSearchResultsFooter}
          onMomentumScrollBegin={() => this._onMomentumScrollBegin()}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.constainer}>
        {this.renderPostsLists()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },

  cellContainer: {
    flex: 1,
    backgroundColor: '#228B22',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 12,
  },

  data: {
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10,
    color: '#ffffff',
  },

  activityIndicator: {
    marginBottom: 30,
    marginTop: -50,
    alignItems: 'center',
  },
});

export default StoryListComponent;
