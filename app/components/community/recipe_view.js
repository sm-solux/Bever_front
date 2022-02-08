import React, { Component } from "react";  
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { preURL } from '../preURL';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class RecipeView extends Component {
  state = {
    post: {
      drinkID: '',
      writer: 'abcde',
      title: '게시글 제목',
      content: '게시글 내용',
      imageLink: require('../../assets/images/starbucks.jpg'),
      date: '2022.01.07 11:23',
      heart: false,
      heartCount: 255,
      recipeID:0,
    },
    userID:0
  }
  componentDidMount(){
    AsyncStorage.getItem('userID').then((value) => {
      this.setState({ userID: value });
    });
    let recipe = this.props.route.params.recipe;
    let dates = recipe.date.replace('T', ' ');
    this.setState({ 
      post :{
        drinkID: recipe.drinkID,
        writer: recipe.writerNickname,
        title: recipe.title,
        content: recipe.content,
        imageLink: recipe.imageLink,
        heart: this.props.route.params.isscraped,
        heartCount: recipe.scrapCount,
        date:dates,
        recipeID:recipe.recipeID
      }
     }) 

     console.log(this.state.post)
  }

  changeHeart = () => {
    this.setState({
      post: {
        ...this.state.post,
        heart: !this.state.post.heart
      }
    })
    
    if(!this.state.post.heart){
      axios
      .post(preURL.preURL + '/v1/scrap/post',{userID:this.state.userID, recipeID:this.state.post.recipeID })
      .then(res => {
        console.log("성공",res.data);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    }else{
      axios
      .post(preURL.preURL + '/v1/scrap/unpost',{userID:this.state.userID, recipeID:this.state.post.recipeID })
      .then(res => {
        console.log("성공",res.data);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    }
  }
  render() {
    return (
      <View style={styles.containView}>
        <ScrollView>
          <View style={styles.titleView}>
            <Text style={styles.title}>{this.state.post.title}</Text>
            <View style={styles.heartView}>
              <TouchableOpacity 
                style={styles.heart}
                onPress={() => this.changeHeart()}
              >
                <Icon 
                  name={this.state.post.heart ? 'heart' : 'heart-outline'} 
                  size={25} 
                  color={this.state.post.heart ? '#F52302' : '#ccc'} 
                />
              </TouchableOpacity>
              <Text style={styles.heartCount}>{this.state.post.heartCount}</Text>
            </View>
          </View>
          <Text style={styles.id}>{this.state.post.writer}</Text>
          <View style={styles.dateView}>
            <Text style={styles.date}>{this.state.post.date}</Text>
          </View>
          <View
            style={styles.line}
          />
          <View style={styles.imageView}>
            <Image 
              source={{uri: this.props.route.params.recipe.imageLink}}
              style={styles.image}
            />
          </View>
          <Text style={styles.content}>{this.state.post.content}</Text>
        </ScrollView>   
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containView: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff'
  }, 
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#111'
  },
  heartView: {
    flexDirection: 'row'
  },
  heart: {
    alignSelf: 'center'
  },
  heartCount: {
    color: '#999',
    alignSelf: 'center',
    marginLeft: 3,
    fontSize: 16
  },
  id: {
    fontSize: 14,
    marginTop: 15,
    color: '#111'
  },
  dateView: {
    flexDirection: 'row'
  },
  date: {
    fontSize: 13,
    color: '#A9A8A8'
  },
  line: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  content: {
    color: '#111',
    fontSize: 16
  }
})

export default RecipeView;