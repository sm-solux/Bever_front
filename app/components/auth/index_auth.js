import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { preURL } from '../../components/preURL';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class LoginScreen extends Component {
  state = {
    keepLogIn: false,
    email: '',
    pw: '',
  }
  componentDidMount(){
    AsyncStorage.getItem('isLoggedIn')
            .then((value) => {
              if (value == 'true') {this.props.navigation.navigate('Root', {screen: 'Main'});}
            });
  }

  onChangeEmail = event =>{
    this.setState({
      email: event,
    });
  }

  onChangePassword = event =>{
    this.setState({
      pw: event,
    });
  }

  submitLogin = () => {

    let data = {
      email: this.state.email,
      pw: this.state.pw,
    };

    axios({
      headers: {
        'content-type': 'application/json'
      },
      method: 'post',
      url: `${preURL.preURL}/v1/user/login`,
      params: data
    })
      .then((response) => {
        console.log(response.data);

        if (response.data.emailNotExist == "true" || response.data.pwWrong) { Alert.alert('이메일 혹은 비밀번호가 틀렸습니다') }
        else {
          AsyncStorage.setItem('userID', String(response.data.userID)).then(() => {
            console.log("로그인 set nm")
          });
          AsyncStorage.setItem('userNickname', response.data.nickname).then(() => {
            console.log("로그인 set nm")
          });
          AsyncStorage.setItem('isLoggedIn', 'true').then(() => {
            console.log("로그인 set 트루")
          });
          AsyncStorage.getItem('isLoggedIn')
            .then((value) => {
              if (value == 'true') this.props.navigation.navigate('Root', {screen: 'Main'});
              // this.props.navigation.navigate('HomeStackComponent', screen= 'Main' );
              // this.props.navigation.navigate('Home')
            });
        }
      })
      .catch((error) => error);

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image source={require('../../assets/images/bever.png')}
            style={styles.logo}/>
          <Text style={styles.logoText}>BEVER</Text>
        </View>
        <View>
          <TextInput 
            style={styles.textInput}
            placeholder='E-mail'
            value={this.state.email}
            onChangeText={this.onChangeEmail}
            keyboardType='email-address'
            />
          <TextInput 
            style={styles.textInput}
            placeholder='Password'
            value={this.state.pw}
            secureTextEntry={true}
            onChangeText={this.onChangePassword}
          />
        </View>
        <View style={styles.keepLogIn}>
          <TouchableOpacity
            onPress={()=>this.setState({
              keepLogIn: !this.state.keepLogIn
            })}
          >
            <Icon 
              name={this.state.keepLogIn ? 'checkbox' : 'checkbox-outline'}
              color={this.state.keepLogIn ? '#fc8621' : '#C6C6C6'}
              size={25}
            />
          </TouchableOpacity>
          <Text style={styles.keepText}>로그인 상태 유지</Text>
        </View>
        <TouchableOpacity
          onPress={()=>{
            // #TODO: 
            this.submitLogin();
            
          }}
        >
          <View style={styles.logInButton}>
            <Text style={styles.logInText}>로그인</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.findRegister}>
          {/* <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('FindID')}
          ><Text style={styles.findRegisterText}>아이디 찾기</Text></TouchableOpacity>
          <View style={{borderLeftColor: '#dfdfdf', borderLeftWidth: 1}}/>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('FindPW')}
          ><Text style={styles.findRegisterText}>비밀번호 찾기</Text></TouchableOpacity>
          <View style={{borderLeftColor: '#dfdfdf', borderLeftWidth: 1}}/> */}
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('SignUp')}
          ><Text style={styles.findRegisterText}>회원가입</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoView: {
    marginBottom: 50
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fc8621'
  },
  textInput: {
    backgroundColor: '#fcecdd',
    width: windowWidth*0.7,
    borderRadius: 10,
    marginBottom: 5,
    paddingLeft: 10,
    borderColor: '#fc8621'
  },
  keepLogIn: {
    flexDirection: 'row',
    marginTop: 5,
    width: windowWidth*0.7,
    marginBottom: 40
  },
  keepText: {
    fontSize: 16,
    padding: 1,
    marginLeft: 3
  },
  logInButton: {
    backgroundColor: '#fc8621',
    borderRadius: 30,
    width: windowWidth*0.7,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  logInText: {
    fontSize: 20,
    color: '#fff'
  },
  findRegister: {
    flexDirection: 'row'
  },
  findRegisterText: {
    marginHorizontal: 10
  }
})

export default LoginScreen;