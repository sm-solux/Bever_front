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

const ediyaItem = [
  {
    name: '커피',
    id: 30000,
    children: [
      { name: 'HOT더블 토피넛 위드샷', id: 3000000},
      { name: 'ICED더블 토피넛 위드샷', id: 3000001},
      { name: 'HOT아인슈패너', id: 3000002},
      { name: 'ICED아인슈패너', id: 3000003},
      { name: '(EX)ICED디카페인 콜드브루 아메리카노', id: 3000004},
      { name: 'ICED디카페인 콜드브루 아메리카노', id: 3000005},
      { name: 'ICED디카페인 콜드브루 라떼', id: 3000006},
      { name: '(EX)ICED디카페인 콜드브루 라떼', id: 3000007},
      { name: 'ICED디카페인 콜드브루 화이트비엔나', id: 3000008},
      { name: 'ICED디카페인 콜드브루 니트로', id: 3000009},
      { name: 'ICED디카페인 흑당 콜드브루', id: 3000010},
      { name: '(EX)ICED디카페인 흑당 콜드브루', id: 3000011},
      { name: 'ICED디카페인 연유 콜드브루', id: 3000012},
      { name: '(EX)ICED디카페인 연유 콜드브루', id: 3000013},
      { name: 'ICED디카페인 콜드브루 크림넛', id: 3000014},
      { name: 'ICED디카페인 버블 흑당 콜드브루', id: 3000015},
      { name: '(EX)ICED디카페인 버블 흑당 콜드브루', id: 3000016},
      { name: 'ICED콜드브루 크림넛', id: 3000017},
      { name: 'ICED흑당 콜드브루', id: 3000018},
      { name: '(EX)ICED흑당 콜드브루', id: 3000019},
      { name: 'ICED버블 흑당 콜드브루', id: 3000020},
      { name: '(EX)ICED버블 흑당 콜드브루', id: 3000021},
      { name: 'ICED연유 카페라떼', id: 3000022},
      { name: 'HOT연유 카페라떼', id: 3000023},
      { name: 'ICED연유 콜드브루', id: 3000024},
      { name: '(EX)ICED연유 콜드브루', id: 3000025},
      { name: 'ICED콜드브루 아메리카노', id: 3000026},
      { name: '아포가토 오리지널', id: 3000027},
      { name: '(EX)ICED콜드브루 아메리카노', id: 3000028},
      { name: '(EX)ICED콜드브루 라떼', id: 3000029},
      { name: 'ICED콜드브루 라떼', id: 3000030},
      { name: 'ICED콜드브루 화이트 비엔나', id: 3000031},
      { name: '콜드브루 니트로', id: 3000032},
      { name: 'HOT에스프레소', id: 3000033},
      { name: 'HOT에스프레소 마끼아또', id: 3000034},
      { name: 'HOT에스프레소 콘파나', id: 3000035},
      { name: 'ICED카페 아메리카노', id: 3000036},
      { name: 'HOT카페 아메리카노', id: 3000037},
      { name: '(EX)ICED카페 아메리카노', id: 3000038},
      { name: '(EX)HOT카페 아메리카노', id: 3000039},
      { name: 'ICED카페 라떼', id: 3000040},
      { name: '(EX)ICED카페 라떼', id: 3000041},
      { name: 'HOT카페 라떼', id: 3000042},
      { name: '(EX)HOT카페 라떼', id: 3000043},
      { name: 'ICED카푸치노', id: 3000044},
      { name: 'HOT카푸치노', id: 3000045},
      { name: 'ICED카페 모카', id: 3000046},
      { name: 'HOT카페 모카', id: 3000047},
      { name: '(EX)ICED카페 모카', id: 3000048},
      { name: '(EX)HOT카페 모카', id: 3000049},
      { name: 'ICED카라멜 마끼아또', id: 3000050},
      { name: 'HOT카라멜 마끼아또', id: 3000051},
      { name: '(EX)ICED 카라멜 마끼아또', id: 3000052},
      { name: '(EX)HOT 카라멜 마끼아또', id: 3000053},
      { name: 'ICED바닐라 라떼', id: 3000054},
      { name: 'HOT 바닐라 라떼', id: 3000055},
      { name: '(EX)ICED 바닐라 라떼', id: 3000056},
      { name: '(EX)HOT바닐라 라떼', id: 3000057},
      { name: '(EX)ICED화이트 초콜릿 모카', id: 3000058},
      { name: 'ICED화이트 초콜릿 모카', id: 3000059},
      { name: 'HOT화이트 초콜릿 모카', id: 3000060},
      { name: '(EX)HOT화이트 초콜릿 모카', id: 3000061},
      { name: 'ICED민트 모카', id: 3000062},
      { name: 'HOT민트 모카', id: 3000063},
    ]
  },
  {
    name: '음료',
    id: 30001,
    children: [
      { name: 'ICED딸기라떼', id: 3000100},
      { name: '(EX)ICED딸기라떼', id: 3000101},
      { name: 'HOT더블 토피넛 라떼', id: 3000102},
      { name: 'ICED더블 토피넛 라떼', id: 3000103},
      { name: '쌍화차', id: 3000104},
      { name: 'ICED쌍화차', id: 3000105},
      { name: '생강차', id: 3000106},
      { name: 'ICED생강차', id: 3000107},
      { name: 'ICED달고나 라떼', id: 3000108},
      { name: '(EX)ICED달고나 라떼', id: 3000109},
      { name: '흑당 라떼', id: 3000110},
      { name: '(EX)흑당 라떼', id: 3000111},
      { name: '버블 흑당 라떼', id: 3000112},
      { name: '(EX)버블 흑당 라떼', id: 3000113},
      { name: '(EX)ICED연유 카페라떼', id: 3000114},
      { name: '(EX)HOT연유 카페라떼', id: 3000115},
      { name: '버블 크림 밀크티', id: 3000116},
      { name: 'ICED초코릿', id: 3000117},
      { name: 'HOT초콜릿', id: 3000118},
      { name: '(EX)ICED초콜릿', id: 3000119},
      { name: '(EX)HOT초콜릿', id: 3000120},
      { name: 'ICED화이트 초콜릿', id: 3000121},
      { name: '(EX)ICED화이트 초콜릿', id: 3000122},
      { name: 'HOT화이트 초콜릿', id: 3000123},
      { name: '(EX)HOT화이트 초콜릿', id: 3000124},
      { name: 'ICED녹차 라떼', id: 3000125},
      { name: 'HOT녹차 라떼', id: 3000126},
      { name: '(EX)ICED녹차 라떼', id: 3000127},
      { name: '(EX)HOT녹차 라떼', id: 3000128},
      { name: 'ICED민트 초콜릿', id: 3000129},
      { name: 'HOT민트 초콜릿', id: 3000130},
      { name: 'ICED이곡 라떼', id: 3000131},
      { name: 'HOT이곡 라떼', id: 3000132},
      { name: 'ICED토피 넛 라떼', id: 3000133},
      { name: 'HOT토피 넛 라떼', id: 3000134},
      { name: '(EX)ICED토피 넛 라떼', id: 3000135},
      { name: '(EX)HOT토피 넛 라떼', id: 3000136},
      { name: 'ICED고구마 라떼', id: 3000137},
      { name: 'HOT고구마 라떼', id: 3000138},
      { name: '홍시주스', id: 3000139},
      { name: '골드키위주스', id: 3000140},
      { name: '딸기주스', id: 3000141},
    ]
  },
  {
    name: '블렌딩 티',
    id: 30002,
    children: [
      { name: 'HOT생딸기 피치 히비스커스', id: 3000200},
      { name: 'ICED생딸기 피치 히비스커스', id: 3000201},
      { name: 'ICED생딸기 피치 루이보스', id: 3000202},
      { name: 'HOT생딸기 피치 루이보스', id: 3000203},
      { name: 'ICED복분자 뱅쇼', id: 3000204},
      { name: 'HOT복분자 뱅쇼', id: 3000205},
      { name: 'ICED복분자 뱅쇼 콤부차', id: 3000206},
      { name: 'HOT그린루이보스', id: 3000207},
      { name: 'ICED그린루이보스', id: 3000208},
      { name: 'HOT샤인히비스커스', id: 3000209},
      { name: 'ICED샤인히비스커스', id: 3000210},
      { name: 'HOT스프링캐모마일', id: 3000211},
      { name: 'ICED스프링캐모마일', id: 3000212},
      { name: 'HOT퓨어페퍼민트', id: 3000213},
      { name: 'ICED퓨어페퍼민트', id: 3000214},
      { name: 'HOT프레시그린티', id: 3000215},
      { name: 'ICED프레시그린티', id: 3000216},
      { name: 'HOT피치얼그레이', id: 3000217},
      { name: 'ICED피치얼그레이', id: 3000218},
      { name: '(EX)ICED석류애플라임', id: 3000219},
      { name: '(EX)ICED자몽네이블오렌지', id: 3000220},
      { name: '(EX)ICED유자피나콜라다', id: 3000221},
      { name: '제주청귤 오리지널', id: 3000222},
      { name: '제주청귤 블러썸', id: 3000223},
      { name: '석류 오리지널', id: 3000224},
      { name: '석류 애플라임', id: 3000225},
      { name: 'HOT레몬 스윗플럼', id: 3000226},
      { name: 'HOT자몽 네이블 오렌지', id: 3000227},
      { name: 'HOT유자 피나콜라다', id: 3000228},
      { name: '아이스티 복숭아', id: 3000229},
      { name: '(EX)아이스티 복숭아', id: 3000230},
      { name: '아이스티 레몬', id: 3000231},
      { name: '(EX)아이스티 레몬', id: 3000232},
      { name: 'ICED밀크티', id: 3000233},
      { name: 'HOT밀크티', id: 3000234},
      { name: '유자차', id: 3000235},
      { name: '레몬차', id: 3000236},
      { name: '자몽차', id: 3000237},
    ]
  },
  {
    name: '플랫치노',
    id: 30003,
    children: [
      { name: 'ICED생딸기 연유 플랫치노', id: 3000300},
      { name: '토피넛 플랫치노', id: 3000301},
      { name: '꿀복숭아 플랫치노', id: 3000302},
      { name: '커피 플랫치노', id: 3000303},
      { name: '망고 플랫치노', id: 3000304},
      { name: '모카 플랫치노', id: 3000305},
      { name: '카라멜 플랫치노', id: 3000306},
      { name: '자몽 플랫치노', id: 3000307},
      { name: '녹차 플랫치노', id: 3000308},
      { name: '초코렛 칩 플랫치노', id: 3000309},
      { name: '민트 초코렛 칩 플랫치노', id: 3000310},
      { name: '플레인 요거트 플랫치노', id: 3000311},
      { name: '블루베리 요거트 플랫치노', id: 3000312},
      { name: '딸기 요거트 플랫치노', id: 3000313},
    ]
  },
  {
    name: '쉐이크 & 에이드',
    id: 30004,
    children: [
      { name: '오리진 쉐이크', id: 3000400},
      { name: '초코 쿠키쉐이크', id: 3000401},
      { name: '딸기 쉐이크', id: 3000402},
      { name: '(EX)레몬 에이드', id: 3000403},
      { name: '레몬 에이드', id: 3000404},
      { name: '자몽 에이드', id: 3000405},
      { name: '(EX)자몽 에이드', id: 3000406},
      { name: '청포도 에이드', id: 3000407},
      { name: '(EX)청포도 에이드', id: 3000408},
    ]
  },
  {
    name: '빙수',
    id: 30005,
    children: [
      { name: '팥인절미 1인빙수', id: 3000500},
      { name: '망고요거트 1인빙수', id: 3000501},
      { name: '망고샤베트 빙수', id: 3000502},
      { name: '딸기 치즈 빙수', id: 3000503},
      { name: '팥빙수', id: 3000504},
    ]
  },
  {
    name: 'RTD',
    id: 30006,
    children: [
      { name: '이디야 청포도&케일 주스', id: 3000600},
      { name: '이디야 감귤&한라봉 주스', id: 3000601},
      { name: '이디야 사과&당근 주스', id: 3000602},
      { name: '이디야 콤부차 복숭아망고', id: 3000603},
      { name: '이디야 콤부차 청포도레몬', id: 3000604},
      { name: '이디야 사과주스', id: 3000605},
      { name: '자몽네이블오렌지', id: 3000606},
      { name: '유자피나콜라다', id: 3000607},
      { name: '석류애플라임', id: 3000608},
    ]
  }
]
class EdiyaReviewPost extends Component {
  state = {
    drinkID: [], 
    writer: '', 
    title: '', 
    content: '', 
    imageLink: '', 
    date: '',
    rate: 0,
    brand: 'ediya' 
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
                    items={ediyaItem}
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

export default EdiyaReviewPost;