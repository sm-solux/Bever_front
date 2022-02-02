import React, { Component } from "react";  
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ScrollView} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { preURL } from '../../preURL';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class StarbucksReviewList extends Component {
  state = {
    lists:[],
    searchValue: ''
  }

  onSearchValue = (input) => {
    this.setState({
      searchValue: input
    })
  }

  onSearch = () => {
    // TODO: 검색하는 메소드 작성
  }

  componentDidMount() {
    axios
      .get(preURL.preURL + '/v1/review/get/STARBUCKS')
      .then(res => {
        // console.log('음료 추천 정보 받았다!', preURL.preURL + '/v1/user/recommend/2');
        console.log('응답:', res.data);

        this.setState({ lists: res.data.list })
        console.log(this.state.lists);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
        // console.log('음료 추천 정보 받았다!',preURL.preURL + '/v1/user/recommend/2');
      });
  }

  renderReviewItem = () => (
    this.state.lists.reverse().map((review) => {
      let dates= review.date.replace('T', ' ');
      
      return (
        <TouchableOpacity
          onPress={() => {this.props.navigation.navigate('StarbucksReviewView',
          {key:review.reviewID, uri:review.imageLink, title:review.title, date:dates, writer:review.user, rate:review.rate, content:review.content})
        }}
          
        >
          <View style={styles.reviewItemView}>
            <Image
              source={{ uri: review.imageLink }}
              style={{ width: 75, height: 75, resizeMode: 'contain' }}
            />
            <View style={{ flex: 2.5 }}>
              <Text style={styles.titleText}>{review.title}</Text>
              <Text style={styles.writerText}>{dates}</Text>
              <View style={styles.drinkView}><Text style={styles.drinkText}>{review.user.uesrID}</Text></View>
            </View>
            <View style={{ borderRightColor: '#e8e8e8', borderRightWidth: 1 }}></View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name='star' color='#FB5748' size={16} />
              <Text style={{ color: '#000', fontWeight: '600', marginLeft: 5 }}>{review.rate}</Text>
              <Text>/5.0</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  )

  render() {
    return (
      <View style={styles.contain}>
      {/* 검색바 */}
        <View style={styles.searchView}>
          <TextInput 
            value={this.state.searchValue}
            placeholder='검색어 입력'
            onChangeText={this.onSearchValue}
            style={styles.searchInput}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={()=>this.onSearch(this.state.searchValue)}
          >
            <Icon name='search' size={32} color='#7E7D7D' />
          </TouchableOpacity>
        </View>

      {/* 게시글 목록 뷰 */}
      <ScrollView>
          {this.renderReviewItem()}
        </ScrollView>

      {/* 게시글 작성 버튼 */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: windowWidth*0.82,
            top: windowHeight*0.7,
          }}
          onPress={() => {this.props.navigation.navigate('StarbucksReviewPost')}}
        >
          <Image 
            source={require('../../../assets/images/addButton.png')}
            style={{width: 50, height: 50}}
            resizeMode='contain'
          />
        </TouchableOpacity>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    padding: 20, 
    backgroundColor: '#fff',
  },
  searchView: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: 30,
    paddingHorizontal: 5,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchInput: {
    fontSize: 16,
    paddingLeft: 15,
    flex: 10,
  },
  searchIcon: {
    flex: 1,
    marginRight: 15,
    marginVertical: 5,
    justifyContent: 'center'
  },
  reviewItemView: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    marginHorizontal: 1,
    marginVertical: 5
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
    color: '#000'
  },
  writerText: {
    marginBottom: 3
  },
  drinkView: {
    padding: 3,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 30,
    alignSelf: 'flex-start'
  },
})

export default StarbucksReviewList;