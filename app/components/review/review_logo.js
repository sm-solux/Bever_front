import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ReviewLogo extends Component {
  state = {
    brandLogo: {
      starbucks: require('../../assets/images/logos/starbucks.png'),
      hollys: require('../../assets/images/logos/hollys.png'),
      ediya: require('../../assets/images/logos/ediya.png'),
      twosome: require('../../assets/images/logos/twosome.png')
    },
    brandName: {
      starbucks: 'Starbucks',
      hollys: 'Hollys',
      ediya: 'Ediya',
      twosome: 'Twosome'
    }
  }

  renderBrandItem = (brandLogo, brandName) => (
    <TouchableOpacity
      onPress={()=>this.props.navigation.navigate(`Review${brandName}`)}
    >
      <View style={styles.brandItem}>
        <Image 
          source={brandLogo} 
          style={{width: 150, height: 150, resizeMode: 'contain', borderRadius: 5}} 
        />
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.brand}>브랜드 보기</Text>
        <View style={styles.listView}>
          {this.renderBrandItem(this.state.brandLogo.starbucks, this.state.brandName.starbucks)}
          {this.renderBrandItem(this.state.brandLogo.hollys, this.state.brandName.hollys)}
        </View>
        <View style={styles.listView}>
          {this.renderBrandItem(this.state.brandLogo.ediya, this.state.brandName.ediya)}
          {this.renderBrandItem(this.state.brandLogo.twosome, this.state.brandName.twosome)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  brand: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    marginLeft: 10
  },
  listView: {
    flexDirection: 'row'
  },
  brandItem: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: windowWidth*0.4,
    alignItems: 'center',
    elevation: 4,
    marginHorizontal: 10,
    marginVertical: 10
  }
})

export default ReviewLogo;