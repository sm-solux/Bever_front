import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './index_auth';
import FindID from './find_id';
import FindPW from './find_pw';
import SignUp from './sign_up';
import RegisterComplete from './register_complete';
import { RootNavigator } from '../../routes';

const AuthStack = createStackNavigator();

class AuthComponent extends Component {
  render() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
        {/* <AuthStack.Screen name='FindID' component={FindID} options={{headerShown: false}}/>
        <AuthStack.Screen name='FindPW' component={FindPW} options={{headerShown: false}}/> */}
        <AuthStack.Screen name='SignUp' component={SignUp} options={{headerTitle: '회원가입', headerTitleAlign: 'center'}}/>
        <AuthStack.Screen name='RegisterComplete' component={RegisterComplete} options={{headerTitle: '회원가입 완료', headerTitleAlign: 'center'}}/>
        <AuthStack.Screen name='Root' component={RootNavigator} options={{headerShown: false}}/>
      </AuthStack.Navigator>
    )
  }
}

export default AuthComponent;