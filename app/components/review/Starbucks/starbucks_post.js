import React, { Component } from "react";
import {
  View, Text, StyleSheet, TextInput, ScrollView, Image,
  Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal, FlatList
} from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stars from 'react-native-stars';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { preURL } from '../../preURL';
import { starbucksItem, twosomeItem } from "../../calendar/Item";
import MIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  maxWidth: 300,
  maxHeight: 300,
}
const countColor = ['#fc862133', '#fc862166', '#fc862199', '#fc8621cc', '#fc8621'];

const cafeList = [
  { name: '카페', id: 0, children: [{ name: '스타벅스', id: 1000 }, { name: '투썸', id: 2000 }] }
]

let userID = null;

class StarbucksReviewPost extends Component {
  state = {
    writer: '',
    title: '',
    content: '',
    date: '',
    rate: 2.5,
    drinkOwners: 'STARBUCKS',
    imageLink: '',
    cafeName: [],
    drinkList: starbucksItem,
    drinkID: [],
    selectedList: [],
    modalVisible: false,
  }
  componentDidMount(){
    AsyncStorage.getItem('userID').then((value) => {
      this.setState({writer:value}); 
    })
  }

  findList = (element) => {
    if (element.date.substring(0, 10) === this.state.selectedDate) {
      return true;
    }
  }

  onDateChange = (date) => {
    this.setState({
      selectedDate: date.toISOString().substring(0, 10)
    }, () => {
      let subList = [];
      subList = this.state.List.filter(this.findList);
      this.setState({
        selectedList: subList,
        selectedFlag: true,
      })
    })
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onChangeCafe = (value) => {
    this.setState({
      cafeName: value
    })
  }

  onChangeDrinkDate = (value) => {
    this.setState({
      drinkDate: value
    })
  }

  onSelectedCafeChange = (selectedItems) => {
    this.setState({
      cafeName: selectedItems,
    }, () => {
      if (this.state.cafeName == 1000) {
        this.setState({ drinkList: starbucksItem, drinkOwners: 'STARBUCKS'});
        
      }
      else if (this.state.cafeName == 2000) {
        this.setState({ drinkList: twosomeItem, drinkOwners: 'TWOSOME' })
      }
    })

  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({
      drinkID: selectedItems
    })
  }

  onChangeTitle = (value) => {
    this.setState({
      title: value
    })
  }

  onChangeContent = (value) => {
    this.setState({
      content: value
    })
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({
      drinkID: selectedItems
    })
  }

  postfmdata = async () => {
    
    let drink = this.state.drinkID;

    const fd = new FormData();
    fd.append('file', {
      name: 'picture.jpg',
      type: 'image/jpeg',
      uri: this.state.imageLink.uri
    });
    fd.append("content", this.state.content);
    fd.append("title", this.state.title);
    fd.append("drinkOwners", this.state.drinkOwners);
    fd.append("rate", this.state.rate);
    fd.append("writer", this.state.writer);
    fd.append("drinkID", drink[0]);

    await fetch(preURL.preURL + '/v1/post/review', {
      method: 'POST',
      body: fd,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('리스트 받았다! ', json);
      })
      .catch(err => {
        if(String(err).includes("Success")){ this.props.navigation.goBack();}
        console.log('전송에 실패: ', err);

      });

  }

  render() {
    const { modalVisible } = this.state;

    if (this.state.flag) {
      this.getList();
    }

    let flatlist = null;
    if (this.state.selectedFlag) {
      flatlist =
        <FlatList
          data={this.state.selectedList}
          renderItem={this.renderItem}
          keyExtractor={item => item.calendarID}
        />
    }
    else {
      flatlist =
        <FlatList
          data={this.state.List}
          renderItem={this.renderItem}
          keyExtractor={item => item.calendarID}
        />
    }
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
        enabled={true}
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <ScrollView>
              {/* 제목 입력란 */}
              <View style={styles.titleView}>
                <Text style={styles.titleText}>제목</Text>
                <TextInput
                  style={styles.titleInput}
                  value={this.state.title}
                  placeholder="제목을 입력하세요"
                  placeholderTextColor='#bdbdbd'
                  onChangeText={this.onChangeTitle}
                />
              </View>

              {/* 음료 입력란 */}
              <View style={[styles.titleView, { alignItems: 'flex-start' }]}>
                <View style={styles.inputView}>
                  <Text style={styles.titleText}>카페</Text>
                  <View style={{ flex: 1 }}>
                    <SectionedMultiSelect
                      items={cafeList}
                      IconRenderer={MIcons}
                      uniqueKey="id"
                      subKey="children"
                      selectText="카페를 선택하세요"
                      showDropDowns={true}
                      readOnlyHeadings={true}
                      onSelectedItemsChange={this.onSelectedCafeChange}
                      selectedItems={this.state.cafeName}
                      single={true}
                    />
                  </View>
                </View>
              </View>

              <View style={[styles.titleView, { alignItems: 'flex-start' }]}>
                <View style={styles.inputView}>
                  <Text style={styles.titleText}>메뉴</Text>
                  <View style={{ flex: 1 }}>
                    <SectionedMultiSelect
                      items={this.state.drinkList}
                      IconRenderer={MIcons}
                      uniqueKey="id"
                      subKey="children"
                      selectText="음료를 선택하세요"
                      showDropDowns={true}
                      readOnlyHeadings={true}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={this.state.drinkID}
                      single={true}
                    />
                  </View>
                </View>
              </View>

              {/* 별점 입력란 */}
              <View style={styles.titleView}>
                <Text style={styles.titleText}>별점</Text>
                <View>
                  <Stars
                    half={true}
                    default={0}
                    update={(value) => this.setState({ rate: value })}
                    spacing={4}
                    starSize={40}
                    count={5}
                    fullStar={<Icons name='star-sharp' style={styles.stars} />}
                    halfStar={<Icons name='star-half-sharp' style={styles.stars} />}
                    emptyStar={<Icons name='star-outline' style={styles.stars} />}
                  />
                </View>
              </View>

              {/* 내용 입력란 */}
              <View style={[styles.titleView, { alignItems: 'flex-start' }]}>
                <Text style={styles.titleText}>내용</Text>
                <TextInput
                  value={this.state.content}
                  style={styles.contentInput}
                  multiline={true}
                  textAlignVertical='top'
                  placeholder="내용을 입력하세요"
                  placeholderTextColor='#bdbdbd'
                  numberOfLines={10}
                  onChangeText={this.onChangeContent}
                />
              </View>

              {/* 이미지 추가 */}
              <View style={styles.titleView}>
                <Text style={styles.titleText}>사진</Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => launchImageLibrary(options, response => {
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.errorCode) {
                        console.log('ImagePicker Error: ', response.errorCode);
                      } else {
                        this.setState({
                          ...this.state,
                          imageLink: response.assets[0],
                        })
                      }
                    })}
                  ><View style={styles.imageButton}>
                      <Icons name='image-outline' size={30} color='#fea82f' />
                    </View></TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => launchCamera(options, response => {
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.errorCode) {
                        console.log('ImagePicker Error: ', response.errorCode);
                      } else {
                        this.setState({
                          recipeData: {
                            ...this.state,
                            imageLink: response.assets[0],
                          }
                        })
                      }
                    })}
                  ><View style={styles.imageButton}>
                      <Icons name='camera-outline' size={30} color='#fea82f' />
                    </View></TouchableOpacity>
                </View>
              </View>
              <View style={{ marginLeft: 50, marginBottom: 10 }}>
                {this.state.imageLink ? (<Image
                  source={this.state.imageLink}
                  style={{ width: 200, height: 200, resizeMode: 'contain' }}
                />) : null}
              </View>

              {/* 리뷰 포스트 버튼 */}
              <TouchableOpacity
                // TODO: 업로드 메소드 만들기
                onPress={() => { this.postfmdata(); }}
              >
                <View style={styles.upload}><Text style={styles.uploadText}>리뷰 작성</Text></View>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 20
  },
  titleView: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleText: {
    color: '#000',
    fontSize: 20,
    marginRight: 10
  },
  titleInput: {
    fontSize: 16,
    paddingVertical: 3,
    borderBottomColor: '#c6c6c6',
    borderBottomWidth: 1,
    flex: 1
  },
  stars: {
    color: '#FDD502',
    fontSize: 25
  },
  contentInput: {
    flex: 1,
    borderColor: '#c6c6c6',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 7
  },
  imageButton: {
    // backgroundColor: '#fea82f',
    borderRadius: 10,
    borderColor: '#fea82f',
    borderWidth: 1,
    alignItems: 'center',
    width: windowWidth * 0.18,
    marginRight: 5
  },
  upload: {
    backgroundColor: '#fcecdd',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  selectDrink: {
    flex: 1,
    backgroundColor: '#876231'
  },

  inputView: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttons: {
    margin: 10,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    backgroundColor: '#fc8621',
    borderRadius: 30,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    width: windowWidth * 0.4,
    alignSelf: 'center'
  },
  inputText: {
    color: '#000',
    fontSize: 16,
    marginRight: 10,
    textAlign: 'center'
  },
  listView: {
    margin: 15,
    flexDirection: 'row',
  },
  listItem: {
    maringLeft: 15,
  }
})

export default StarbucksReviewPost;