import React, { Component, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImagePicker, ImageOrVideo } from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { preURL } from '../preURL';
import { starbucksItem, twosomeItem } from '../calendar/Item';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from "react-native-sectioned-multi-select";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  maxWidth: 300,
  maxHeight: 300,
};
const cafeList = [
  { name: '카페', id: 0, children: [{ name: '스타벅스', id: 1000 }, { name: '투썸', id: 2000 }] }
]

class PostScreen extends Component {
  state = {
    
      title: '',
      content: '',
      imageLink: '',
      uri: '',
      writer: 1,
      drinkOwners: 'STARBUCKS',
      imageLink: '',
      cafeName: [],
      drinkList: starbucksItem,
      drinkID: [],
      selectedList: [],
      modalVisible: false,
    
  }

  componentDidMount() {
    AsyncStorage.getItem('userID').then((value) => {
      this.setState({ writer: value });
    })
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({
      drinkID: selectedItems
    })
  }

  findList = (element) => {
    if (element.date.substring(0, 10) === this.state.selectedDate) {
      return true;
    }
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
        this.setState({ drinkList: starbucksItem, drinkOwners: 'STARBUCKS' });

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

  postfmdata = async () => {

    console.log(this.state);
    console.log(this.state.uri.uri);

    const fd = new FormData();
    fd.append('file', {
      name: 'picture.jpg',
      type: 'image/jpeg',
      uri: this.state.uri.uri
    });
    fd.append("content", this.state.content);
    fd.append("title", this.state.title);
    fd.append("writer", this.state.writer);
    fd.append("drinkID", this.state.drinkID[0])
    console.log();
    await fetch(preURL.preURL + '/v1/recipe/post', {
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

  onChangeInput = (item, value) => {
    if (item === 'title') {
      this.setState({title: value,});
    } else if (item === 'content') {
      this.setState({content: value,});
    } else if (item === 'img') {
      this.setState({imageLink: value,});
    }
  }



  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}
          enabled={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View >
              <ScrollView>
                {/* 음료 입력란 */}
                <View style={[styles.titleView, { alignItems: 'flex-start' }]}>
                  <View style={styles.inputView2}>
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
                  <View style={styles.inputView2}>
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
                <View style={styles.inputView}>
                  <TextInput
                    value={this.state.title}
                    placeholder='제목을 입력하세요'
                    placeholderTextColor='#BDBDBD'
                    onSubmitEditing={(event) => this.textHandler(event.nativeEvent.text)}
                    onChangeText={value => this.onChangeInput('title', value)}
                    editable={true}
                    style={styles.titleInput}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    value={this.state.content}
                    placeholder='내용을 입력하세요'
                    placeholderTextColor='#BDBDBD'
                    // onSubmitEditing={(event)=>this.textHandler(event.nativeEvent.text)}
                    onChangeText={value => this.onChangeInput('content', value)}
                    editable={true}
                    multiline={true}
                    style={styles.contentInput}
                  />
                </View>
                
                <View style={styles.imageButtonView}>
                  {/* TODO: 이미지 가져오는 버튼(갤러리, 카메라) */}
                  <TouchableOpacity
                    onPress={() => launchImageLibrary(options, response => {
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.errorCode) {
                        console.log('ImagePicker Error: ', response.errorCode);
                      } else {
                        this.setState({
                          
                            ...this.state,
                            uri: response.assets[0]
                          
                        })
                      }
                    })}
                  >
                    <View style={styles.imageButton}>
                      <Icon name='images-outline' size={30} color='#fff' />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => launchCamera(options, response => {
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.errorCode) {
                        console.log('ImagePicker Error: ', response.errorCode);
                      } else {
                        this.setState({
                          
                            ...this.state,
                            uri: response.assets[0]
                          
                        })
                      }
                    })}
                  >
                    <View style={styles.imageButton}>
                      <Icon name='camera-outline' size={30} color='#fff' />
                    </View>
                  </TouchableOpacity>
                </View>
                {this.state.uri ? (<Image
                  source={this.state.uri}
                  style={{ width: 300, height: 300, }}
                  resizeMode='contain'
                />) : null}
                <TouchableOpacity
                  onPress={() => { this.postfmdata(); }}
                >
                  <View style={styles.recipeUpload}>
                    <Text style={styles.recipeUploadText}>레시피 추가</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 30
  },
  inputView: {
    marginBottom: 10
  },
  titleInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16
  },
  contentInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    height: 300,
    textAlignVertical: 'top'
  },
  imageButtonView: {
    flexDirection: 'row',
    marginBottom: 5
  },
  imageButton: {
    backgroundColor: '#fea82f',
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: windowWidth * 0.25,
    marginRight: 5
  },
  recipeUpload: {
    backgroundColor: '#FCECDD',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10
  },
  recipeUploadText: {
    fontSize: 18,
    fontWeight: 'bold'
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
  inputView2: {
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


export default PostScreen;