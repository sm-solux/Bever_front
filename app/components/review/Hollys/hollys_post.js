import React, { Component } from "react";  
import { View, Text, StyleSheet, TextInput, ScrollView, Image,
  Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Stars from 'react-native-stars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  maxWidth: 300,
  maxHeight: 300,
};

class HollysReviewPost extends Component {
  state = {
    drinkID: '', 
    writer: '', 
    title: '', 
    content: '', 
    imageLink: '', 
    date: '',
    rate: 0,
    brand: 'hollys' 
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
  render() {
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
                  placeholder='제목을 입력하세요'
                  placeholderTextColor='#bdbdbd'
                  onChangeText={this.onChangeTitle}
                />
              </View>

              {/* 별점 입력란 */}
                <View style={styles.titleView}>
                  <Text style={styles.titleText}>별점</Text>
                  <View>
                    <Stars
                      half={true}
                      default={0}
                      update={(value)=>this.setState({rate:value})}
                      spacing={4}
                      starSize={40}
                      count={5}
                      fullStar={<Icon name='star-sharp' style={styles.stars}/>}
                      halfStar={<Icon name='star-half-sharp' style={styles.stars}/>}
                      emptyStar={<Icon name='star-outline' style={styles.stars}/>}
                    />   
                  </View>
                </View>

              {/* 내용 입력란 */}
                <View style={[styles.titleView, {alignItems: 'flex-start'}]}>
                  <Text style={styles.titleText}>내용</Text>
                  <TextInput
                    value={this.state.content}
                    style={styles.contentInput}
                    multiline={true}
                    textAlignVertical="top"
                    placeholder="내용을 입력하세요"
                    placeholderTextColor='#bdbdbd'
                    numberOfLines={10}
                    onChangeText={this.onChangeContent}
                  />
                </View>

              {/* 이미지 추가 */}
                <View style={styles.titleView}>
                  <Text style={styles.titleText}>사진</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={()=>launchImageLibrary(options, response=>{
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.errorCode){
                          console.log('ImagePicker Error: ', response.errorCode);
                        } else {
                          this.setState({
                            ...this.state,
                            imageLink: response.assets[0],
                          })
                        }
                      })}
                    ><View style={styles.imageButton}>
                      <Icon name='image-outline' size={30} color='#fea82f'/>
                    </View></TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>launchCamera(options, response=>{
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.errorCode){
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
                      <Icon name='camera-outline' size={30} color='#fea82f'/>
                    </View></TouchableOpacity>
                  </View>
                </View>
                <View style={{marginLeft: 50, marginBottom: 10}}>
                  {this.state.imageLink ? (<Image 
                    source={this.state.imageLink}
                    style={{width: 200, height: 200, resizeMode: 'contain'}}
                  />) : null }
                </View>

              {/* 리뷰 포스트 버튼 */}
                <TouchableOpacity 
                  // TODO: 업로드 메소드 만들기
                  onPress={()=>{console.warn(this.state)}}
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
    width: windowWidth*0.18, 
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
  }
})

export default HollysReviewPost;