import moment from "moment";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/Ionicons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const countColor = ['#fc862133', '#fc862166', '#fc862199', '#fc8621cc', '#fc8621'];
class CalendarComponent extends Component {
  state = {
    selectedDate: null,
    drinkName: '',
    cafeName: '',
    drinkDate: '',
    modalVisible: false,
    drinkCount: 0
  } 

  customDatesStyles=[{
    date: moment('2022-02-15'),
    style: {backgroundColor: countColor[0]},
    textStyle: {color: 'black'}, // sets the font color
  }];

  onDateChange = (date) => {
    this.setState({
      selectedDate: date,
    })
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  renderDrinkItem = () => (
    <View style={styles.menuView}>
      <Icon name="ellipse" color={'#fc8621'} size={10} style={styles.dot}/>
      <View style={styles.menuText}>
        <Text style={styles.cafe}>스타벅스</Text>
        <Text style={styles.menu}>아이스 아메리카노</Text>
      </View>
      <View style={styles.iconView}>
        <TouchableOpacity 
          //TODO: 수정메소드 onPress={}
        ><Icon name="pencil" color={'#fc8621'} size={20} style={styles.pencil}/></TouchableOpacity>
        <TouchableOpacity
          //TODO: 삭제메소드 onPress={}
        ><Icon name="trash" color={'#fc8621'} size={20} style={styles.trash}/></TouchableOpacity>
      </View>
    </View> 
  )

  onChangeCafe = (value) =>{
    this.setState({
      cafeName: value
    })
  }

  onChangeDrink = (value) =>{
    this.setState({
      drinkName: value
    })
  }

  onChangeDrinkDate = (value) => {
    this.setState({
      drinkDate: value
    })
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
      {/* 추가 모달창 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>{
            Alert.alert('Modal has been closed');
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>날짜</Text>
                <TextInput 
                  value={this.state.drinkDate}
                  placeholder='예) 2022-02-01'
                  onChangeText={this.onChangeDrinkDate}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>카페명</Text>
                <TextInput 
                  value={this.state.cafeName}
                  placeholder="카페명을 입력해주세요"
                  onChangeText={this.onChangeCafe}/>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>메뉴명</Text>
                <TextInput 
                  value={this.state.drinkName}
                  placeholder="메뉴명을 입력해주세요"
                  onChangeText={this.onChangeDrink}/>
              </View>
              <TouchableOpacity
                onPress={()=>{
                  //TODO: 등록메소드
                  this.setModalVisible(!modalVisible)
                  console.warn(this.state.drinkDate, this.state.cafeName, this.state.drinkName)
                }}
              >
                <Text style={styles.addButton}>추가하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <CalendarPicker 
          onDateChange={this.onDateChange} 
          selectedDayColor="#fff"
          selectedDayTextColor="#ffbf00"
          weekdays={["일","월","화","수","목","금","토"]}
          months={["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]}
          monthNamesShort={["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]}
          previousTitle={"이전 달"}
          nextTitle={"다음 달"}
          // textStyle={{fontFamily:fontFamily, color:fontColor}}
          // onMonthChange={(date)=>{setMonth(changeMonthType(date.toString()))}}
          customDatesStyles={this.customDatesStyles}
          minDate={new Date(2020,12,1)}
          maxDate={new Date(2050,11,31)}
        />
        <View style={styles.line}></View>

      {/* 먹은 음료 리스트 */}
        {this.renderDrinkItem()}
        {this.renderDrinkItem()}

      {/* 추가 버튼 */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: windowWidth*0.82,
            top: windowHeight*0.78,
          }}
          onPress={() => {this.setModalVisible(true)}}
        >
          <Image 
            source={require('../../assets/images/addButton.png')}
            style={{width: 50, height: 50}}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  line: {
    marginTop: 30,
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dot: {
    marginHorizontal: 15
  },
  menuText: {
    flex: 4,
  },
  cafe: {
    color: '#bebebe',
    fontSize: 12
  },
  menu: {
    color: '#000',
    fontSize: 16
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  pencil: {
    marginHorizontal: 5,
    alignSelf: 'flex-end'
  },
  trash: {
    marginHorizontal: 5,
    alignSelf: 'flex-end'
  },
  centeredView: {
    justifyContent: 'center',
    backgroundColor: '#ffffffcc',
    flex: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  inputView: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  addButton: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#fc8621',
    borderRadius: 30,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    width: windowWidth*0.4,
    alignSelf: 'center'
  },
  inputText: {
    color: '#000',
    fontSize: 16,
    marginRight: 10,
    textAlign: 'center'
  }
})

export default CalendarComponent;