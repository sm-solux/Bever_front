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
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ImagePicker, ImageOrVideo} from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  maxWidth: 300,
  maxHeight: 300,
};

class PostScreen extends Component {
  state = {
    recipeData: {
      title: '',
      content: '',
      imageLink: '',
      uri: ''
    }
  }

  onChangeInput = (item, value) => {
    if (item === 'title') {
      this.setState(prevState => ({
        recipeData: {
          ...prevState,
          title: value,
        }
      }))
    } else if (item === 'content') {
      this.setState(prevState => ({
        recipeData: {
          ...prevState,
          content: value,
        }
      }))
    } else if (item === 'img') {
      this.setState(prevState => ({
        recipeData: {
          ...prevState,
          imageLink: value,
        }
      }))
    }
  }

  

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null }
        style={styles.container}
        enabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View >
            <ScrollView>
              <View style={styles.inputView}>
                <TextInput
                  value={this.state.recipeData.title}
                  placeholder='제목을 입력하세요'
                  placeholderTextColor='#BDBDBD'
                  onSubmitEditing = {(event) => this.textHandler(event.nativeEvent.text)}
                  onChange={value=>this.onChangeInput('title', value)}
                  editable={true}
                  style={styles.titleInput}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput 
                  value={this.state.recipeData.content} 
                  placeholder='내용을 입력하세요'
                  placeholderTextColor='#BDBDBD'
                  // onSubmitEditing={(event)=>this.textHandler(event.nativeEvent.text)}
                  onChange={value=>this.onChangeInput('content', value)}
                  editable={true}
                  multiline={true}
                  style={styles.contentInput}
                />
              </View>
              <View style={styles.imageButtonView}>
                {/* TODO: 이미지 가져오는 버튼(갤러리, 카메라) */}
                <TouchableOpacity
                  onPress={()=>launchImageLibrary(options, response=>{
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.errorCode){
                      console.log('ImagePicker Error: ', response.errorCode);
                    } else {
                      this.setState({
                        recipeData: {
                          ...this.state.recipeData,
                          uri: response.assets[0]
                        }
                      })
                    }
                  })}
                //   onPress={() => ImagePicker.openPicker({
                //     width: 300,
                //     height: 300,
                //     cropping: true
                //   }).then(image => {
                //     this.setState({
                //       recipeData: {
                //         ...this.state.recipeData,
                //         uri: image.path
                //       }
                //     })
                //   }).catch((error)=>{
                //     console.log(error);
                //   })
                // }
                >
                  <View style={styles.imageButton}>
                    <Icon name='images-outline' size={30} color='#fff'/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>launchCamera(options, response=>{
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.errorCode){
                      console.log('ImagePicker Error: ', response.errorCode);
                    } else {
                      this.setState({
                        recipeData: {
                          ...this.state.recipeData,
                          uri: response.assets[0]
                        }
                      })
                    }
                  })}
                >
                  <View style={styles.imageButton}>
                    <Icon name='camera-outline' size={30} color='#fff'/>
                  </View>
                </TouchableOpacity>
              </View>
              {this.state.recipeData.uri ? (<Image 
                source={this.state.recipeData.uri}
                style={{width: 300, height: 300,}}
                resizeMode='contain'
              />) :  null}
              <TouchableOpacity
                // TODO: 업로드 메소드 만들기
              >
                <View style={styles.recipeUpload}>
                  <Text style={styles.recipeUploadText}>레시피 추가</Text>
                </View>
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
    width: windowWidth*0.25, 
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
  }
})

export default PostScreen;