import React, { Component } from "react";  
import { View, Text, StyleSheet, TextInput, ScrollView, Image, 
  TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class TomNTomsReviewView extends Component {
  state={
    drinkID : "음료아이디",
    writer : "글 작성자 아이디",
    title: "게시글 제목",
    content: "게시글내용",
    imageLink: require('../../../assets/images/tomntoms.jpg'),
    date:"글 작성날짜",
    rate: 4.5,
  }

  render() {
    return (
      <View style={styles.contain}>
        <ScrollView>
        {/* 게시글 제목 */}
          <View style={styles.titleView}>
            <Text style={styles.title}>{this.state.title}</Text>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='star' color='#FB5748' size={16} />
              <Text style={{color:'#000', fontWeight:'600', marginLeft: 5}}>{this.state.rate.toFixed(1)}</Text>
              <Text>/5.0</Text>
            </View>
          </View>       
          <Text style={styles.writer}>{this.state.writer}</Text>
          <Text style={styles.date}>{this.state.date}</Text>
          <View style={styles.line}></View> 

        {/* 이미지 뷰 */}
          {this.state.imageLink ? (
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <Image 
                source={this.state.imageLink}
                style={{width: 300, height: 300, resizeMode: 'contain'}}
              />
            </View>
          ) : null}

        {/* 게시글 내용 */}
          <Text style={styles.content}>{this.state.content}</Text>  
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }, 
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#111',
    flex: 4,
  },
  writer: {
    fontSize: 14,
    marginTop: 15,
    color: '#111',
  },
  date: {
    fontSize: 13,
    color:'#A8A8A8'
  },
  line: {
    marginVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  content: {
    fontSize: 16,
    color: '#111',
  }
})

export default TomNTomsReviewView;