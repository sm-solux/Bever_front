import React, { Component } from "react";  
import { View, Text, StyleSheet, TextInput, ScrollView, Image,
  Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
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
}

const starbucksItem = [
  {
    name: '콜드 브루 커피',
    id: 10000,   // 100은 스타벅스 id, 00은 콜드브루는 id
    children: [
      { name: '나이트로 바닐라 크림', id: 1000000},
      { name: '나이트로 콜드 브루', id: 1000001},
      { name: '돌체 콜드 브루', id: 1000002},
      { name: '바닐라 크림 콜드 브루', id: 1000003},
      { name: '벨벳 다크 모카 나이트로', id: 1000004},
      { name: '시그니처 더 블랙 콜드 브루', id: 1000005},
      { name: '제주 비자림 콜드 브루', id: 1000006},
      { name: '콜드 브루', id: 1000007},
      { name: '콜드 브루 몰트', id: 1000008},
      { name: '콜드 브루 오트 라떼', id: 1000009},
      { name: '콜드 브루 플로트', id: 1000010},
      { name: '프렌치 애플 타르트 나이트로', id: 1000011},
    ]
  },
  {
    name: '브루드 커피',
    id: 10001,
    children: [
      { name: '아이스 커피', id: 1000100},
      { name: '오늘의 커피', id: 1000101},
    ]
  },
  {
    name: '에스프레소',
    id: 10002,
    children: [
      { name: '라벤더 베이지 오트 라떼', id: 1000200},
      { name: '아이스 라벤더 베이지 오트 라떼', id: 1000201},
      { name: '에스프레소 콘 파나', id: 1000202},
      { name: '에스프레소 마키아또', id: 1000203},
      { name: '아이스 카페 아메리카노', id: 1000204},
      { name: '카페 아메리카노', id: 1000205},
      { name: '아이스 카라멜 마키아또', id: 1000206},
      { name: '카라멜 마키아또', id: 1000207},
      { name: '아이스 카푸치노', id: 1000208},
      { name: '카푸치노', id: 1000209},
      { name: '라벤더 카페 브레베', id: 1000210},
      { name: '럼 샷 코르타도', id: 1000211},
      { name: '바닐라 빈 라떼', id: 1000212},
      { name: '블론드 에스프레소 라떼', id: 1000213},
      { name: '사케라또 비안코 오버 아이스', id: 1000214},
      { name: '스타벅스 돌체 라떼', id: 1000215},
      { name: '아이스 라벤더 카페 브레베', id: 1000216},
      { name: '아이스 바닐라 빈 라떼', id: 1000217},
      { name: '아이스 블론드 에스프레소 라떼', id: 1000218},
      { name: '아이스 스타벅스 돌체 라떼', id: 1000219},
      { name: '아이스 카페 라떼', id: 1000220},
      { name: '카페 라떼', id: 1000221},
      { name: '아이스 카페 모카', id: 1000222},
      { name: '아이스 화이트 초콜릿 모카', id: 1000223},
      { name: '카페 모카', id: 1000224},
      { name: '화이트 초콜릿 모카', id: 1000225},
      { name: '바닐라 플랫 화이트', id: 1000226},
      { name: '바닐라 스타벅스 더블 샷', id: 1000227},
      { name: '블론드 바닐라 더블 샷 마키아또', id: 1000228},
      { name: '사케라또 아포가토', id: 1000229},
      { name: '스파클링 시트러스 에스프레소', id: 1000230},
      { name: '아이스 블론드 바닐라 더블 샷 마키아또', id: 1000231},
      { name: '에스프레소', id: 1000232},
      { name: '커피 스타벅스 더블 샷', id: 1000233},
      { name: '클래식 아포가토', id: 1000234},
      { name: '헤이즐넛 스타벅스 더블 샷', id: 1000235},
    ]
  },
  {
    name: '프라푸치노',
    id: 10003,
    children: [
      { name: '더블 에스프레소 칩 프라푸치노', id: 1000300},
      { name: '모카 프라푸치노', id: 1000301},
      { name: '에스프레소 프라푸치노', id: 1000302},
      { name: '자바 칩 프라푸치노', id: 1000303},
      { name: '카라멜 프라푸치노', id: 1000304},
      { name: '화이트 초콜릿 모카 프라푸치노', id: 1000305},
      { name: '바닐라 크림 프라푸치노', id: 1000306},
      { name: '제주 까망 크림 프라푸치노', id: 1000307},
      { name: '제주 쑥떡 크림 프라푸치노', id: 1000308},
      { name: '제주 유기농 말차로 만든 크림 프라푸치노', id: 1000309},
      { name: '초콜릿 크림 칩 프라푸치노', id: 1000310},
      { name: '화이트 타이거 프라푸치노', id: 1000311},
    ]
  },
  {
    name: '블렌디드',
    id: 10004,
    children: [
      { name: '망고 패션 프루트 블렌디드', id: 1000400},
      { name: '딸기 딜라이트 요거트 블렌디드', id: 1000401},
      { name: '망고 바나나 블렌디드', id: 1000402},
      { name: '민트 초콜릿 칩 블렌디드', id: 1000403},
      { name: '피치 & 레몬 블렌디드', id: 1000404},
    ]
  },
  {
    name: '스타벅스 피지오',
    id: 10005,
    children: [
      { name: '블랙 티 레모네이드 피지오', id: 1000500},
      { name: '쿨 라임 피지오', id: 1000501},
      { name: '패션 탱고 티 레모네이드 피지오', id: 1000502},
    ]
  },
  {
    name: '티(티바나)',
    id: 10006,
    children: [
      { name: '뉴이어 시트리스 티', id: 1000600},
      { name: '아이스 뉴이어 시트러스 티', id: 1000601},
      { name: '라임 패션 티', id: 1000602},
      { name: '민트 블렌드 티', id: 1000603},
      { name: '별궁 오미자 유스베리 티', id: 1000604},
      { name: '아이스 라임 패션 티', id: 1000605},
      { name: '아이스 민트 블렌드 티', id: 1000606},
      { name: '아이스 얼 그레이 티', id: 1000607},
      { name: '아이스 유스베리 티', id: 1000608},
      { name: '아이스 유자 민트 티', id: 1000609},
      { name: '아이스 잉글리쉬 브렉퍼스트 티', id: 1000610},
      { name: '아이스 제주 유기 녹차', id: 1000611},
      { name: '아이스 캐모마일 블렌드 티', id: 1000612},
      { name: '아이스 히비스커스 블렌드 티', id: 1000613},
      { name: '얼 그레이 티', id: 1000614},
      { name: '유스베리 티', id: 1000615},
      { name: '유자 민트 티', id: 1000616},
      { name: '잉글리쉬 브렉퍼스트 티', id: 1000617},
      { name: '자몽 허니 블랙 티', id: 1000618},
      { name: '제주 유기 녹차', id: 1000619},
      { name: '캐모마일 블렌드 티', id: 1000620},
      { name: '패션 프루트 티', id: 1000621},
      { name: '히비스커스 블렌드 티', id: 1000622},
      { name: '아이스 별궁 오미자 유스베리 티', id: 1000623},
      { name: '아이스 자몽 허니 블랙 티', id: 1000624},
      { name: '아이스 제주 카멜리아 티', id: 1000625},
      { name: '아이스 패션 프루트 티', id: 1000626},
      { name: '아이스 푸를 청귤 민트 티', id: 1000627},
      { name: '제주 카멜리아 티', id: 1000628},
      { name: '돌체 블랙 밀크 티', id: 1000629},
      { name: '아이스 돌체 블랙 밀크 티', id: 1000630},
      { name: '아이스 제주 유기농 말차로 만든 라떼', id: 1000631},
      { name: '아이스 차이 티 라떼', id: 1000632},
      { name: '아이스 허니 얼 그레이 밀크 티', id: 1000633},
      { name: '제주 유기농 말차로 만든 라떼', id: 1000634},
      { name: '차이 티 라떼', id: 1000635},
      { name: '허니 얼 그레이 밀크 티', id: 1000636},
    ]
  },
  {
    name: '기타 제조 음료',
    id: 10007,
    children: [
      { name: '시그니처 핫 초콜릿', id: 1000700},
      { name: '아이스 시그니처 초콜릿', id: 1000701},
      { name: '플러피 판다 아이스 초콜릿', id: 1000702},
      { name: '플러피 판다 핫 초콜릿', id: 1000703},
      { name: '스타벅스 슬래머', id: 1000704},
      { name: '스팀 우유', id: 1000705},
      { name: '아이스 제주 까망 라떼', id: 1000706},
      { name: '우유', id: 1000707},
      { name: '제주 까망 라떼', id: 1000708},
      { name: '제주 스노잉 백록담', id: 1000709},
      { name: '제주 쑥쑥 라떼', id: 1000710},
    ]
  },
  {
    name: '스타벅스 주스(병음료)',
    id: 10008,
    children: [
      { name: '기운내라임', id: 1000800},
      { name: '파이팅 청귤', id: 1000801},
      { name: '한방에 쭉 감당', id: 1000802},
      { name: '딸기주스', id: 1000803},
      { name: '망고주스', id: 1000804},
      { name: '스타 루비 자몽 스위트', id: 1000805},
      { name: '유기농 오렌지 100% 주스', id: 1000806},
      { name: '케일 & 사과주스', id: 1000807},
      { name: '토마토주스', id: 1000808},
      { name: '핑크 용과 레모네이드', id: 1000809},
      { name: '한라봉주스', id: 1000810},
      { name: '햇사과 주스', id: 1000811},
      { name: '딸기 가득 요거트', id: 1000812},
      { name: '블루베리 요거트', id: 1000813},
      { name: '치아씨드 요거트', id: 1000814},
    ]
  }
]

class StarbucksReviewPost extends Component {
  state = {
    drinkID: [], 
    writer: '', 
    title: '', 
    content: '', 
    imageLink: '', 
    date: '',
    rate: 0,
    brand: 'starbucks',
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
                    items={starbucksItem}
                    IconRenderer={Icon}
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
                    fullStar={<Icons name='star-sharp' style={styles.stars}/>}
                    halfStar={<Icons name='star-half-sharp' style={styles.stars}/>}
                    emptyStar={<Icons name='star-outline' style={styles.stars}/>}
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
                      <Icons name='image-outline' size={30} color='#fea82f'/>
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
                      <Icons name='camera-outline' size={30} color='#fea82f'/>
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
  },
  selectDrink: {
    flex: 1,
    backgroundColor: '#876231'
  }
})

export default StarbucksReviewPost;