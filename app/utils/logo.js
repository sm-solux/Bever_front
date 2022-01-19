import React from "react";
import { View, Image, Text, StyleSheet } from 'react-native';

const LogoTitle = () => (
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