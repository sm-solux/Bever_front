import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Button,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import axios from "axios";
import { preURL } from '../preURL';
import AsyncStorage from '@react-native-community/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class RecipeList extends Component {
  state = {
    searchValue: '',
    lists: [],
    scraplist: [],
    userID: 0,
    refreshing: false,
  }
  componentDidMount() {

    AsyncStorage.getItem('userID').then((value) => {
      this.setState({ userID: value });
      console.log("userid:" + this.state.userID);
      axios
        .get(preURL.preURL + '/v1/recipe/list/' + this.state.userID)
        .then(res => {
          this.setState({ lists: res.data.recipeList.reverse() });
          this.setState({ scraplist: res.data.userScrapList });
          console.log("take", this.state.scraplist);
          console.log("take2", this.state.lists[0].recipeID);
        })
        .catch(err => {
          console.log('에러 발생: ', err);
        });
    })

  }

  renderSearchBar = () => (
    <View style={styles.searchView}>
      <TextInput
        value={this.state.searchValue}
        editable={true}
        placeholder='Search'
        placeholderTextColor='#BDBDBD'
        onChangeText={(value) => { this.onChangeText(value); }}
        style={styles.searchInput}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={value => this.search(value)}
      >
        <Icon name='search' size={32} color='#7E7D7D' />
      </TouchableOpacity>
    </View>
  )


  onChangeText = (value) => {
    this.setState({
      searchValue: value
    })
  }

  search = (value) => {
    // TODO: 검색하는 메소드 작성
  }

  wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.wait(1000).then(() => {
      console.log("start");
      axios
        .get(preURL.preURL + '/v1/recipe/list/' + this.state.userID)
        .then(res => {
          this.setState({ lists: res.data.recipeList.reverse() });
          this.setState({ scraplist: res.data.userScrapList });
          this.setState({refreshing:false}); 
        })
        .catch(err => {
          console.log('에러 발생: ', err);
        });
        console.log("finish");
        
    })
  };

  renderRecipeItem = () => (

    this.state.lists.filter((originList) => {

      console.log("검색어", this.state.searchValue);
      console.log("제목", String(originList.title).toLowerCase());
      if (this.state.searchValue == "") {
        return originList;
      } else if (this.state.searchValue.indexOf("#") == 0
        && (originList.drinkOwner.toLowerCase().includes(this.state.searchValue.substring(1))
          || originList.drinkName.toLowerCase().includes(this.state.searchValue.substring(1)))) {
        return originList;
      }
      else if (originList.title.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
        return originList;
      }

    }
    ).map((recipe) => {


      let isscrap = false;

      if (this.state.scraplist.includes(recipe.recipeID)) { isscrap = true; }
      let dates = recipe.date.replace('T', ' ');
      return (
        <View>
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('RecipeView', { recipe: recipe, isscraped: isscrap }); }}
          >
            <View style={styles.recipeItem}>
              {recipe.imageLink ? (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: recipe.imageLink }}
                    style={{
                      backgroundColor: '#E8E8E8',
                      borderRadius: 10,
                      width: windowWidth * 0.89,
                      height: windowHeight * 0.3,
                    }}
                  />
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: '#E8E8E8',
                    borderRadius: 10,
                    width: windowWidth * 0.89,
                    height: windowHeight * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}><Text>No Image</Text></View>
                </View>
              )}
              <View style={styles.recipeTextView}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>


              </View>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => { let text = '#' + recipe.drinkOwner; this.setState({ searchValue: text }); }}
            >
              <View style={styles.drinkView}><Text style={styles.hashtags}># {recipe.drinkOwner}</Text></View>
            </TouchableOpacity>
            <Text>  </Text>
            <TouchableOpacity
              onPress={() => { let text = '#' + recipe.drinkName; this.setState({ searchValue: text }); }}
            >
              <View style={styles.drinkView}><Text style={styles.hashtags}># {recipe.drinkName}</Text></View>
            </TouchableOpacity>
          </View>
          <Text style={styles.timeText}>{dates}</Text>
        </View>
      )
    })

  )

  render() {
    return (
      <View style={styles.container}>
        {/* <Button 
          title="click"
          onPress={()=>{this.props.navigation.navigate('Post')}}/> */}
        {this.renderSearchBar()}
        <ScrollView
          
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
        >
          {this.renderRecipeItem()}
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: windowWidth * 0.82,
            top: windowHeight * 0.6,
          }}
          onPress={() => { this.props.navigation.navigate('Post') }}
        >
          <Image
            source={require('../../assets/images/addButton.png')}
            style={{ width: 50, height: 50 }}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
  },
  searchView: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: 30,
    paddingHorizontal: 5,
    // marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchInput: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 10,
  },
  searchIcon: {
    flex: 1,
    marginRight: 15,
    marginVertical: 5,
    justifyContent: 'center'
  },
  recipeItem: {
    // alignItems: 'center',
    padding: 5,
    paddingVertical: 10,
    // backgroundColor: '#a234b3'
  },
  recipeTextView: {
    paddingTop: 5,
    paddingLeft: 3
  },
  recipeTitle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  timeText: {
    paddingTop: 2,
  },
  hashtags: {
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  },
  drinkView: {
    padding: 3,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 30,
    alignSelf: 'flex-start'
  },
})

export default RecipeList;