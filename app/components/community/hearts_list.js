import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import RecipeView from './recipe_view';
import axios from "axios";
import { preURL } from '../preURL';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class HeartList extends Component {
  state = {
    heart: true,
    lists: [],
    scrapList: {
      postID: '00000',
      imageLink: '',
      title: '게시글 제목',
      content: '게시글 내용',
      date: '2022.01.08 02:59',
      writer: 'abcde'
    },
    userID: 0,
    count: 0,
    refreshing:false,
  }

  componentDidMount() {

    AsyncStorage.getItem('userID').then((value) => {
      this.setState({ userID: value });
      console.log(this.state.userID);
      axios
        .post(preURL.preURL + '/v1/scrap/list/' + this.state.userID)
        .then(res => {
          this.setState({ lists: res.data });
          console.log("take3", this.state.lists[0].recipeID);
        })
        .catch(err => {
          console.log('에러 발생: ', err);
        });
    })

  }

  changeHeart = () => {
    this.setState({ heart: !this.state.heart })
  }

  renderRecipeItem = () => (

    this.state.lists.map((recipe) => {


      return (

        <TouchableOpacity
          onPress={() => { this.props.navigation.navigate('RecipeView', { recipe: recipe, isscraped: true }); }}
        >
          <View style={styles.recipeItem}>
            <TouchableOpacity
              style={styles.heartTouch}
              onPress={() => this.changeHeart()}
            >
              <Icon
                name={this.state.heart ? 'heart' : 'heart-outline'}
                size={25}
                color={this.state.heart ? '#FC8621' : '#ccc'}
                style={styles.heart} />
            </TouchableOpacity>
            <Image
              source={{ uri: recipe.imageLink }}
              resizeMode='contain'
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.itemText}>{recipe.title}</Text>
          </View>
        </TouchableOpacity>
      )
    })

  )
  wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  onRefresh =()=> {
    this.setState({refreshing:true});
    this.wait(2000).then(() => {
      axios
        .post(preURL.preURL + '/v1/scrap/list/' + this.state.userID,{})
        .then(res => {
          this.setState({ lists: res.data });
          console.log("take3", this.state.lists[0].recipeID);
        })
        .catch(err => {
          console.log('에러 발생: ', err);
        });
       this.setState({refreshing:false}); 
      });
  };

  render() {
    return (
      <View>
        <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={this.state.refreshing}  onRefresh={this.onRefresh} />}>
          <View style={{ alignItems: 'center', paddingVertical: 15, }}>
            <FlatList
              data={this.state.lists.reverse()}
              
              numColumns={2}
              keyExtractor={(item, index) => item.id}
              renderItem={(item) =>{
                let recipe = item.item;
                return(
                <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate('RecipeView', { recipe: recipe, isscraped: true }); }}
                >
                  <View style={styles.recipeItem}>
                    <TouchableOpacity
                      style={styles.heartTouch}
                      onPress={() => this.changeHeart()}
                    >
                      <Icon
                        name={this.state.heart ? 'heart' : 'heart-outline'}
                        size={25}
                        color={this.state.heart ? '#FC8621' : '#ccc'}
                        style={styles.heart} />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: recipe.imageLink }}
                      resizeMode='contain'
                      style={{ width: 100, height: 100 }}
                    />
                    <Text style={styles.itemText}>{recipe.title}</Text>
                  </View>
                </TouchableOpacity>
                )
              }
              }
            />

          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {

  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12
  },
  recipeItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: windowWidth * 0.4,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
  heartTouch: {
    alignSelf: 'flex-end',
  },
  heart: {
    marginTop: 10,
    marginRight: 7
  },
  itemText: {
    paddingHorizontal: 2,
    marginVertical: 10,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold'
  },
})

export default HeartList;