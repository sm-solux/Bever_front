import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import RecipeView from './recipe_view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class HeartList extends Component {
  state = {
    heart: true,
    scrapList: {
      postID: '00000',
      imageLink: '',
      title: '게시글 제목',
      content: '게시글 내용',
      date: '2022.01.08 02:59',
      writer: 'abcde'
    }
  }

  changeHeart = () => {
    this.setState({heart: !this.state.heart})
  }

  renderRecipeItem = () => (
    <TouchableOpacity
      onPress={()=>{this.props.navigation.navigate('RecipeView')}}
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
            style={styles.heart}/>
        </TouchableOpacity>
        <Image 
          source={require('../../assets/images/javachip.png')}
          resizeMode='contain'
          style={{width: 100, height: 100}}
        />
        <Text style={styles.itemText}>스타벅스 자바칩 프라푸치노 레시피</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <View>
        <ScrollView style={styles.scrollView}>
          <View style={{alignItems: 'center', paddingVertical: 15,}}>
            <View style={styles.row}>
              {this.renderRecipeItem()}
              {this.renderRecipeItem()}
            </View>
            <View style={styles.row}>
              {this.renderRecipeItem()}
              {this.renderRecipeItem()}
            </View>
            <View style={styles.row}>
              {this.renderRecipeItem()}
              {this.renderRecipeItem()}
            </View>
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
    width: windowWidth*0.4,
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