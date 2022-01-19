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
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PostScreen from "./post";
import RecipeView from "./recipe_view";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class RecipeList extends Component {
  state={
    searchValue:'',
    posts: {
      postID: '00000',
      imageLink: require('../../assets/images/starbucks.jpg'),
      title: '이디야 토피넛 라떼 레시피 추천',
      content: '게시글 내용',
      date: '2022.01.07 11:23',
      writer: 'abcde'
    }
  }

  renderSearchBar = () => (
    <View style={styles.searchView}>
      <TextInput
        value={this.state.searchValue}
        editable={true}
        placeholder='Search'
        placeholderTextColor='#BDBDBD'
        onChange={value=>this.onChangeText(value)}
        style={styles.searchInput}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={value=>this.search(value)}
      >
        <Icon name='search' size={32} color='#7E7D7D' />
      </TouchableOpacity>
    </View>
  )

  onChangeText(value) {
    this.setState({
      searchValue: value
    })
  }

  search(value) {
    // TODO: 검색하는 메소드 작성
  }

  renderRecipeItem = () => (
    <TouchableOpacity
      onPress={()=>{this.props.navigation.navigate('RecipeView')}}
    >
      <View style={styles.recipeItem}>
        {this.state.posts.imageLink ? (
          <View style={{alignItems: 'center'}}>
          <Image 
            source={this.state.posts.imageLink}
            style={{
              backgroundColor: '#E8E8E8',
              borderRadius: 10,
              width: windowWidth*0.89,
              height: windowHeight*0.3,
            }}
          />
        </View>
        ):(
          <View style={{alignItems: 'center'}}>
            <View style={{
              backgroundColor: '#E8E8E8',
              borderRadius: 10,
              width: windowWidth*0.89,
              height: windowHeight*0.1,
              justifyContent:'center',
              alignItems: 'center'
            }}><Text>No Image</Text></View>
          </View>
        )}
        <View style={styles.recipeTextView}>
          <Text style={styles.recipeTitle}>{this.state.posts.title}</Text>
          <Text style={styles.timeText}>{this.state.posts.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.container}>
        {/* <Button 
          title="click"
          onPress={()=>{this.props.navigation.navigate('Post')}}/> */}
        {this.renderSearchBar()}
        <ScrollView>
          {this.renderRecipeItem()}
          {this.renderRecipeItem()}
          {this.renderRecipeItem()}
        </ScrollView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: windowWidth*0.82,
            top: windowHeight*0.7,
          }}
          onPress={() => {this.props.navigation.navigate('Post')}}
        >
          <Image 
            source={require('../../assets/images/addButton.png')}
            style={{width: 50, height: 50}}
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
  searchView:{
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
  }
})

export default RecipeList;