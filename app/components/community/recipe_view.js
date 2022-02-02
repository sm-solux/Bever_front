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
      heartCount: 255
    }
  }
  componentDidMount(){
    let recipe = this.props.route.params.recipe;
    let dates = recipe.date.replace('T', ' ');
    this.setState({ 
      post :{
        drinkID: recipe.drinkID,
        writer: recipe.writerNickname,
        title: recipe.title,
        content: recipe.content,
        imageLink: recipe.imageLink,
        heart: false,
        heartCount: 255,
        date:dates,
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
              source={this.state.post.imageLink}
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