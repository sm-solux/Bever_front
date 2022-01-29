import React, { Component } from "react";  
import { View, Text, StyleSheet, TextInput, ScrollView, Image,
  Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
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

const hollysItem = [
  {
    name: '커피',
    id: 20000,
    children: [
      { name: '디카페인 아메리카노', id: 2000000},
      { name: '디카페인 카페라떼', id: 2000001},
      { name: '바닐라 딜라이트(디카페인)', id: 2000002},
      { name: '프리미엄 블렌드 아메리카노', id: 2000003},
      { name: '콜드브루 딜라이트', id: 2000004},
      { name: '더블샷 바닐라 딜라이트', id: 2000005},
      { name: '프리미엄 블렌드 딥라떼', id: 2000006},
      { name: '바닐라 딜라이트', id: 2000007},
      { name: '리스트레또 딜라이트', id: 2000008},
      { name: '콜드브루 라떼', id: 2000009},
      { name: '콜드브루', id: 2000010},
      { name: '카라멜 마키아또', id: 2000011},
      { name: '카페모카', id: 2000012},
      { name: '카푸치노', id: 2000013},
      { name: '카페라떼', id: 2000014},
      { name: '아메리카노', id: 2000015},
      { name: '아포가토', id: 2000016},
      { name: '에스프레소', id: 2000017},
    ]
  },
  {
    name: '라떼 / 초콜릿 / 티',
    id: 20001,
    children: [
      { name: '딸기 듬뿍 라떼', id: 2000100},
      { name: '민트초코', id: 2000101},
      { name: '우리 고구마 라떼', id: 2000102},
      { name: '그린티라떼', id: 2000103},
      { name: '밀크티라떼', id: 2000104},
      { name: '핫초코', id: 2000105},
      { name: '화이트초코', id: 2000106},
      { name: '유자 캐모마일', id: 2000107},
      { name: '복숭아 얼그레이', id: 2000108},
      { name: '홍자몽차', id: 2000109},
      { name: '제주 한라봉 감귤차', id: 2000110},
      { name: '고흥 유자차', id: 2000111},
      { name: '해남 녹차', id: 2000112},
      { name: '페퍼민트', id: 2000113},
      { name: '캐모마일', id: 2000114},
      { name: '얼그레이', id: 2000115},
    ]
  },
  {
    name: '할리치노 / 빙수',
    id: 20002,
    children: [
      { name: '해피도넛 딸기할리치노', id: 2000200},
      { name: '더 진한 딸기스무디', id: 2000201},
      { name: '생딸기 주스', id: 2000202},
      { name: '민트 초코칩 할리치노', id: 2000203},
      { name: '피치 딸기 크러쉬', id: 2000204},
      { name: '애플망고 스무디', id: 2000205},
      { name: '사과 비트 착즙 주스', id: 2000206},
      { name: '오렌지 당근 착즙 주스', id: 2000207},
      { name: '딸기 치즈케익 할리치노', id: 2000208},
      { name: '딸기 스무디', id: 2000209},
      { name: '청포도케일 착즙주스', id: 2000210},
      { name: '플레인 요거트 할리치노', id: 2000211},
      { name: '그린티 할리치노', id: 2000212},
      { name: '다크초코칩 할리치노', id: 2000213},
      { name: '콜드브루 할리치노', id: 2000214},
    ]
  },
  {
    name: '스파클링',
    id: 20003,
    children: [
      { name: '복숭아 자두 스파클링', id: 2000300},
      { name: '청포도 스파클링', id: 2000301},
      { name: '자몽 파인 스파클링', id: 2000302},
    ]
  },
]

class HollysReviewPost extends Component {
  state = {
    drinkID: [], 
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

  onSelectedItemsChange = (selectedItems) => {
    this.setState({
      drinkID: selectedItems
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

            {/* 음료 입력란 */}
              <View style={[styles.titleView, {alignItems: 'flex-start'}]}>
                <Text style={styles.titleText}>음료</Text>
                <View style={{flex:1}}>
                  <SectionedMultiSelect
                    items={hollysItem}
                    IconRenderer={Icons}
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