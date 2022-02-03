import moment from "moment";
import React, { Component } from "react";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import AsyncStorage from '@react-native-community/async-storage';

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
  FlatList
} from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from 'react-native-vector-icons/MaterialIcons';
import {ediyaItem, starbucksItem, twosomeItem} from './Item';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const countColor = ['#fc862133', '#fc862166', '#fc862199', '#fc8621cc', '#fc8621'];

const cafeList = [
  { name : '카페', id : 0, children : [ {name : '스타벅스', id : 1000} , {name : '투썸' , id : 2000} ] }
]

let userID=null;


class CalendarComponent extends Component {
  state = {
    selectedDate: null,
    cafeName: [],
    drinkList : starbucksItem,
    drinkID : [],
    drinkDate: '',
    modalVisible: false,
    month : new Date().getMonth()+1,
    flag : true,
    List : [],
    selectedList : [],
    selectedFlag : false,
    customDatesStyles : [],
  } 
  userID = 1;


    getList = async() => {
    console.log(this.state.month+"월 리스트 요청");

    AsyncStorage.getItem('userID').then((value) => {
      userID=value; console.log("userid:"+userID); 
    let params = "userID="+userID+"&month="+this.state.month;
    console.log(params);
      try{
        fetch('http://localhost:8080/v1/calendar?userID='+userID+"&month="+this.state.month,{
          method : "GET",
          headers : {
            'Content-Type' : 'application/json'
          }
        }).then(res=>res.json())
        .then((res)=>{
            console.log("데이터 불러옴");
            this.setState({
              List : res,
              flag : !this.state.flag
            },()=>{
              let dateList = [];
              this.state.List.map((item)=>{
                dateList.push({
                  date : item.date.substring(0,10),
                  style : {backgroundColor : countColor[1]},
                  textStyle : { color : 'white'}
                })
              })
              this.setState({
                customDatesStyles : dateList
              })
            })

        })
      }catch(err) {
        console.log(err);
      }
    }).catch((err)=>{console.log("아이디에러" + err)});
  }

    monthEnum = {
    "Jan" : 1, "Feb" : 2, "Mar" : 3, "Apr" : 4, "May" : 5, "Jun" : 6, "Jul" : 7, "Aug" : 8,
    "Sep" : 9, "Oct" : 10, "Nov" : 11, "Dec" : 12
  }

    onMonthChange = (month) => {
    month = (month.toString()).substring(4,7);
    console.log("month : "+month);
    this.setState({
      month : this.monthEnum[month],
      flag : !this.state.flag,
      selectedFlag : !this.state.selectedFlag
    });
    console.log("월 바뀜");
  }

  findList = (element) => {
    if(element.date.substring(0,10) === this.state.selectedDate) {
      return true;
    }
  }

  onDateChange = (date) => {
    this.setState({
    selectedDate : date.toISOString().substring(0,10)
    },()=>{
      let subList = [];
      subList = this.state.List.filter(this.findList);
      this.setState({
        selectedList : subList,
        selectedFlag : true,
      })
    })
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onChangeCafe = (value) =>{
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
    },()=>{
      if(this.state.cafeName==1000) {
        this.setState({drinkList : starbucksItem})
      }
      else if (this.state.cafeName==2000) {
        this.setState({drinkList : twosomeItem})
      }
    })

  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({
      drinkID: selectedItems
    })
  }

    submitData = () =>{
    try{
      console.log("날짜:"+this.state.drinkDate+" 00:00");
      console.log("음료 : "+this.state.drinkID);
      console.log("아이디 : "+userID);
      let drink = this.state.drinkID;
      let date = this.state.drinkDate + " 00:00";
      fetch('http://localhost:8080/v1/calendar/post',{
        method : "POST",
        body : JSON.stringify({
          "userID" : userID,
          "drinkID" : drink,
          "date" : date
        }),
        headers : {
          'Content-Type' : 'application/json'
        }
      })
      .then((res)=>{
        if(res.status==200) {
          console.log("데이터 저장 성공");
          Alert.alert("저장 완료");
          this.setState({
            flag:!this.state.flag,
            modalVisible : !this.state.modalVisible
          })
        }
        else {
          console.log(res);
        }
      })
    }catch(err) {
      console.log(err);
    }

  }

    renderItem = ({item})=>(
      <View style={styles.listView}>
        <View style={styles.listItem}>
          {item.drinks.drinkImageLink?(
            <Image style={{width:70, height:70, borderRadius:10, marginRight:10}} source={{uri:item.drinks.drinkImageLink}}/>
          ):(
            <Text style={{width:70, height:70, paddingTop : 25, borderRadius: 10, borderWidth :1,marginRight:10 }}>이미지 없음</Text>
          )}
        </View>
        <View style={[styles.listItem]}>
          <Text style={{paddingBottom:15}}>{item.date.substring(0,10)}</Text>
          <Text>{item.drinks.drinkOwners} {item.drinks.drinkName}</Text>
        </View>
      </View>
  )

  render() {
    const { modalVisible } = this.state;

    if(this.state.flag) { 
      this.getList();
    }

    let flatlist = null;
    if(this.state.selectedFlag) {
      flatlist = 
          <FlatList
            data = {this.state.selectedList}
            renderItem = {this.renderItem}
            keyExtractor = {item=>item.calendarID}
          />
    }
    else {
      flatlist = 
          <FlatList
          data = {this.state.List}
          renderItem = {this.renderItem}
          keyExtractor = {item=>item.calendarID}
        />
    }

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
                <Text style={styles.inputText}>카페</Text>
                <View style={{flex:1}}>
                  <SectionedMultiSelect
                      items={cafeList}
                      IconRenderer={Icons}
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
              <View style={styles.inputView}>
                <Text style={styles.inputText}>메뉴</Text> 
                <View style={{flex:1}}>
                  <SectionedMultiSelect
                    items={this.state.drinkList}
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
                  {/* <Text>{this.state.drinkID}</Text> */}
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={()=>{this.submitData()}}
                >
                  <Text style={styles.buttons}>추가하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{
                    this.setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.buttons}>취소하기</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <CalendarPicker 
          onDateChange={this.onDateChange} 
          onMonthChange={this.onMonthChange}
          selectedDayColor="#fff"
          selectedDayTextColor="#ffbf00"
          weekdays={["일","월","화","수","목","금","토"]}
          months={["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]}
          monthNamesShort={["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]}
          previousTitle={"이전 달"}
          nextTitle={"다음 달"}
          customDatesStyles={this.state.customDatesStyles}
          minDate={new Date(2020,12,1)}
          maxDate={new Date(2050,11,31)}
        />
        <View style={styles.line}></View>

      {/* 먹은 음료 리스트 */}
        {flatlist}

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
  buttonView : {
    flexDirection : 'row',
    alignContent : 'center',
    justifyContent : 'center',
  },
  buttons: {
    margin : 10,
    borderRadius : 20,
    paddingTop: 10,
    paddingBottom : 10,
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
  },
    listView : {
    margin : 15,
    flexDirection : 'row',
  },
  listItem : {
    maringLeft : 15,
  }
})

export default CalendarComponent;