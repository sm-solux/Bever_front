import React, { Component } from "react";  
import { View, Text, StyleSheet, TextInput, ScrollView, Image,
  Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from 'react-native-vector-icons/MaterialIcons';
import Stars from 'react-native-stars';
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

const twosomeItem = [
  {
    name: '에스프레소 베리에이션',
    id: 40000,
    children: [
      { name: '아메리카노', id: 4000000},
      { name: '카페라떼', id: 4000001},
      { name: '카페모카', id: 4000002},
      { name: '카라멜마키아또', id: 4000003},
      { name: '카푸치노', id: 4000004},
      { name: '바닐라카페라떼', id: 4000005},
      { name: '숏카페라떼', id: 4000006},
      { name: '롱블랙', id: 4000007},
      { name: '에스프레소', id: 4000008},
      { name: '스페니쉬연유카페라떼', id: 4000009},
      { name: '아이스크림카페라떼', id: 4000010},
      { name: '달고나카페라떼', id: 4000011},
      { name: '콜드브루', id: 4000012},
      { name: '콜드브루라떼', id: 4000013},
      { name: '흑임자카페라떼', id: 4000014},
    ]
  },
  {
    name: '티 베리에이션',
    id: 40001,
    children: [
      { name: '잉글리쉬브렉퍼스트', id: 4000100},
      { name: '제주유기농녹차', id: 4000101},
      { name: '1837블랙티', id: 4000102},
      { name: '카모마일', id: 4000103},
      { name: '크림카라멜', id: 4000104},
      { name: '프렌치얼그레이', id: 4000105},
      { name: '그나와민트티', id: 4000106},
      { name: '애플민트티', id: 4000107},
      { name: '허니레몬티', id: 4000108},
      { name: '유자레몬티', id: 4000109},
      { name: '오렌지자몽티', id: 4000110},
      { name: '로얄밀크티', id: 4000111},
      { name: '그린티라떼', id: 4000112},
      { name: '아이스버블밀크티', id: 4000113},
      { name: '아이스버블그린티라떼', id: 4000114},
    ]
  },
  {
    name: '음료',
    id: 40002,
    children: [
      { name: '치즈크럼블딸기쉐이크', id: 4000200},
      { name: '생딸기가득주스', id: 4000201},
      { name: '스트로베리초콜릿프라페', id: 4000202},
      { name: '스트로베리라떼', id: 4000203},
      { name: '민트초코프라페', id: 4000204},
      { name: '샤인머스캣청포도에이드', id: 4000205},
      { name: '복숭아에이드', id: 4000206},
      { name: '쑥라떼', id: 4000207},
      { name: '고구마라떼', id: 4000208},
      { name: '모카칩커피프라페', id: 4000209},
      { name: '카라멜커피프라페', id: 4000210},
      { name: '스트로베리피치프라페', id: 4000211},
      { name: '요거트프라페', id: 4000212},
      { name: '망고프라페', id: 4000213},
      { name: '제주말차프라페', id: 4000214},
      { name: '바닐라밀크쉐이크', id: 4000215},
      { name: '초코밀크쉐이크', id: 4000216},
      { name: '커피밀크쉐이크', id: 4000217},
      { name: '로얄밀크티쉐이크', id: 4000218},
      { name: '자몽에이드', id: 4000219},
      { name: '오렌지에이드', id: 4000220},
      { name: '레몬셔벗에이드', id: 4000221},
      { name: '샹그리아에이드', id: 4000222},
      { name: '오렌지자몽주스', id: 4000223},
      { name: '키위바나나주스', id: 4000224},
      { name: '망고바나나라떼', id: 4000225},
      { name: '블루베리요거트드링크', id: 4000226},
      { name: '플레인요거트드링크', id: 4000227},
      { name: '초콜릿라떼', id: 4000228},
    ]
  },
  {
    name: '아이스크림',
    id: 40003,
    children: [
      { name: '컵)소프트아이스크림', id: 4000300},
      { name: '콘)소프트아이스크림', id: 4000301},
      { name: '바닐라아포가토', id: 4000302},
      { name: '밀크소프트아포가토', id: 4000303},
    ]
  },
]

class TwosomeReviewPost extends Component {
  state = {
    drinkID: [], 
    writer: '', 
    title: '', 
    content: '', 
    imageLink: '', 
    date: '',
    rate: 0,
    brand: 'twosome'
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
                  placeholder="제목을 입력하세요"
                  placeholderTextColor='#bdbdbd'
                  onChangeText={this.onChangeTitle}
                />
              </View>
            
            {/* 음료 입력란 */}
              <View style={[styles.titleView, {alignItems: 'flex-start'}]}>
                <Text style={styles.titleText}>음료</Text>
                <View style={{flex:1}}>
                  <SectionedMultiSelect
                    items={twosomeItem}
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
                    update={(value)=>this.setState({rate: value})}
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

export default TwosomeReviewPost;