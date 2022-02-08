import React from "react";
import { View, Image, Text, StyleSheet,TouchableOpacity, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const LogoTitle = () => (
  
    <TouchableOpacity 
    onPress={()=>{
      AsyncStorage.setItem('isLoggedIn', 'false').then(() => {
        console.log("로그인 set false");
        NativeModules.DevSettings.reload();
      });}}
    >
      <View style={styles.container}>
    <Image 
      source={require('../assets/images/bever.png')}
      style={{width: 50, height: 50, flex: 1}}
      resizeMode='contain'
    />
    <Text style={styles.text}>BEVER</Text>
    <Image 
      source={require('../assets/images/bever.png')}
      style={{width: 50, height: 50, flex: 1}}
      resizeMode='contain'
    />
    </View>
    </TouchableOpacity>
  
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  }
})

export default LogoTitle;