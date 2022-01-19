import React, { Component } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SignUp extends Component {
  state = {
    email: '',
    emailCheck: '',
    pw: '',
    pwCheck: '',
    btnClicked: false,
    pwSame: false,
    pwCheckAlert: false,
  }

  onChangeEmail = event => {
    this.setState({
      email: event,
    })
  }
  onChangePw = event => {
    this.setState({
      pw: event,
    })
  }
  onChangePwCheck = event => {
    this.setState({
      pwCheck: event,
    });
  }
  onCheckEmail = () => {
    // #TODO: 서버에서 메일주소 중복 여부 판단에 따라 emailCheck를 unusable/usable로 바꾸는 거 하기
    this.setState({
      btnClicked: true,
      emailCheck: 'usable'
    });
  }
  onCheckPw = () => {
    if (this.state.pw === this.state.pwCheck) {
      this.setState({
        pwCheckAlert: true,
        pwSame: true,
      })
    } else {
      this.setState({
        pwCheckAlert: true,
        pwSame: false,
      })
    }
  }

  onRegister = () => {
    if (this.state.emailCheck==='usable'&&this.state.pwSame===true){
      this.props.navigation.navigate('RegisterComplete')
    } else {
      Alert.alert('이메일과 비밀번호를 확인해주세요.')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.text}>아이디(이메일)</Text>
          <View style={styles.idView}>
            <TextInput
              style={styles.textInput}
              value={this.state.email}
              onChangeText={this.onChangeEmail}
              placeholder="이메일 주소"
              keyboardType='email-address'
            />
            <TouchableOpacity
              onPress={()=>this.onCheckEmail()}
            >
              <Text style={styles.button}>중복확인</Text>
            </TouchableOpacity>
          </View>
          {this.state.btnClicked ? 
            <View style={{flexDirection: 'row'}}>
              <Icon 
                name={this.state.emailCheck==='usable' ? 'checkmark-circle-outline':'close-circle-outline'}
                size={15}
                color={this.state.emailCheck==='usable' ? '#00dd00' : '#FE2E2E'}
              />
              {this.state.emailCheck==='usable' ? <Text style={{fontSize: 12, color:'#00dd00'}}>사용 가능한 이메일입니다.</Text> :
              <Text style={{fontSize: 12, color:'#FE2E2E'}}>이미 사용 중인 이메일입니다.</Text>}
            </View> 
            : null
          }
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>비밀번호</Text>
          <TextInput style={[styles.textInput,{width: windowWidth*0.83}]} 
            value={this.state.pw}
            onChangeText={this.onChangePw}
            placeholder="비밀번호"
            secureTextEntry={true}
            />
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>비밀번호 확인</Text>
          <TextInput style={[styles.textInput,{width: windowWidth*0.83}]} 
            value={this.state.pwCheck}
            onChangeText={this.onChangePwCheck}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            onEndEditing={()=>this.onCheckPw()}
          />
          {this.state.pwCheckAlert ? 
            <View style={{flexDirection: 'row'}}>
            <Icon 
              name={this.state.pwSame ? 'checkmark-circle-outline':'close-circle-outline'}
              size={15}
              color={this.state.pwSame ? '#00dd00' : '#FE2E2E'}
            />
            {this.state.pwSame ? <Text style={{fontSize: 12, color:'#00dd00'}}>일치합니다.</Text> :
            <Text style={{fontSize: 12, color:'#FE2E2E'}}>일치하지 않습니다.</Text>}
          </View>
            : null
          }
        </View>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={()=>this.onRegister()}
          >
            <Text style={styles.registerBtn}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30
  },
  input: {
    marginBottom: 20
  },
  text: {
    color: '#000',
    fontSize: 18
  },
  idView: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  textInput: {
    width: windowWidth*0.63,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  button: {
    borderRadius: 30,
    color: '#fc8621',
    borderColor: '#fc8621',
    borderWidth: 1,
    padding: 7,
    paddingHorizontal: 20
  },
  registerBtn: {
    backgroundColor: '#fc8621',
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }
})

export default SignUp;