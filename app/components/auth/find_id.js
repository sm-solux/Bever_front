import React, { Component } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class FindID extends Component {
  render() {
    return (
      <Text>Find ID</Text>
    )
  }
}

const styles = StyleSheet.create({

})

export default FindID;