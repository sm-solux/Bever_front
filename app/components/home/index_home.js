import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const userName = '눈송이';

class HomeComponent extends Component {
  state = {
    searchValue: '',
  }

  onChangeText(value) {
    this.setState({
      searchValue: value
    })
  }

  search(value) {
    // TODO: 검색하는 메소드 작성
  }

  renderItems = () => (
    // TODO: TouchableOpacity onPress 함수 적용
    <TouchableOpacity>
      <View style={styles.menuItem}>
        <View style={styles.menuItemImageView}>
          <Image
            source={require('../../assets/images/starbucks.jpg')}
            resizeMode='contain'
            style={{width: 90, height: 90,}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <View style={{marginBottom: 7, marginLeft: 3}}>
            <Text style={styles.cafe}>스타벅스</Text>
            <Text style={styles.cafe}>아이스아메리카노</Text>
          </View>
          {/* <Text style={styles.cafePrice}>4100원</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  )

  renderRankMenuItems = (rank) => {
    let source='';
    if (rank === 1) {
      source=require('../../assets/images/rank1.png')
    } else if (rank === 2) {
      source=require('../../assets/images/rank2.png')
    } else if (rank === 3) {
      source=require('../../assets/images/rank3.png')
    }

    // TODO: TouchableOpacity onPress 함수 적용
    return (
      <TouchableOpacity>
        {rank < 4 ? (
          <Image 
            source={source}
            style={{width: 35, height: 35, position: 'absolute', zIndex: 1,}}
          />
        )
        : null}
        <View style={styles.menuItem}>
          <View style={styles.menuItemImageView}>
            <Image
              source={require('../../assets/images/starbucks.jpg')}
              resizeMode='contain'
              style={{width: 90, height: 90,}}
            />
          </View>
          <View style={{marginTop: 10}}>
            <View style={{marginBottom: 7, marginLeft: 3}}>
              <Text style={styles.cafe}>스타벅스</Text>
              <Text style={styles.cafe}>아이스아메리카노</Text>
            </View>
            {/* <Text style={styles.cafePrice}>4100원</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRankItem = () => (
    // FIXME: map 함수로 rank 받아오기
    <TouchableOpacity>
      <View style={styles.rankTextView}>
        <Text style={styles.rankNumberText}>1.</Text>
        <Text>스타벅스</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchView}>
          <TextInput
            value={this.state.searchValue}
            editable={true}
            placeholder='음료 검색'
            placeholderTextColor='#BDBDBD'
            onChangeText={value=>this.onChangeText(value)}
            style={styles.searchInput}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={()=>this.search(this.state.searchValue)}
          >
            <Icon name='search' size={32} color='#7E7D7D' />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}> 
          <Text style={styles.menuTitle}>{userName} 님의 추천 메뉴</Text>
          <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.renderItems()}
            {this.renderItems()}
            {this.renderItems()}
            {this.renderItems()}
          </ScrollView>
        </View>
        <View style={styles.line}/>

        <View style={[styles.menuContainer]}>
          <Text style={styles.menuTitle}>인기 급상승 메뉴</Text>
          <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.renderRankMenuItems(1)}
            {this.renderRankMenuItems(2)}
            {this.renderRankMenuItems(3)}
            {this.renderRankMenuItems(4)}
          </ScrollView>
        </View>
        <View style={styles.line}/>

        <View style={[styles.menuContainer, {flex: 0.9}]}>
          <Text style={styles.menuTitle}>실시간 검색어 순위</Text>
          <View style={{marginTop: 5}}>
            <View style={{flexDirection: 'row'}}>
              {/* TODO: 검색어 순위 받아와서 자동화 되게 수정하기 */}
              <View style={{flex: 1}}>
                {this.renderRankItem()}
                {this.renderRankItem()}
                {this.renderRankItem()}
                {this.renderRankItem()}
                {this.renderRankItem()}
              </View>
              <View style={{flex: 1}}>
                {this.renderRankItem()}
                {this.renderRankItem()}
                {this.renderRankItem()}
                {this.renderRankItem()}
                {this.renderRankItem()}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  searchView:{
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: 30,
    paddingHorizontal: 5,
    marginHorizontal: 20,
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
  menuContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 1,
  },
  menuTitle: {
    color: '#FC8621',
    fontSize: 16,
    fontWeight: 'bold'
  },
  scrollView: {
    marginVertical: 5
  },
  menuItem:{
    marginHorizontal: 2,
  },
  menuItemImageView: {
    width: 100,
    height: 100,
    borderWidth:1, 
    borderRadius: 10, 
    borderColor: '#FC8621',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cafe: {
    fontSize: 13,
    color: '#FC8621'
  },
  cafePrice: {
    color: '#FC8621',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 3
  },
  rankTextView: {
    flexDirection: 'row',
    paddingVertical: 2
  },
  rankNumberText: {
    paddingRight: 5
  },
  line: {
    marginVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  }
})

export default HomeComponent;