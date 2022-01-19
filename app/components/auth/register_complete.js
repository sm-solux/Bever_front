import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

class RegisterComplete extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name='checkmark-circle-outline' size={100} color='#FC8621'/>
        <Text style={styles.completeText}>회원 가입이 완료되었습니다!</Text>
        <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('LoginScreen')}
        >
          <Text style={styles.logInBtn}>로그인 하기</Text>
        </TouchableOpacity>
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
  completeText: {
    color: '#000',
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 30
  },
  logInBtn: {
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#fc8621',
    color: '#fff',
    fontSize: 20,
  }
})

export default RegisterComplete;