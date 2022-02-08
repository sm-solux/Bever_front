import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { preURL } from '../preURL';

class DrinkInfoComponent extends Component {
    state = {
        searchValue: '',
        drinkList: [],
        drinkList2: [],
        rank: 0,
        userName: '',
    }


    onChangeText(value) {
        this.setState({
            searchValue: value
        })
    }

    componentDidMount() {
        // postServer(){
        // useEffect(() => {
        AsyncStorage.getItem('userNickname').then((value) => {
            this.setState({ userName: value })
        });
        AsyncStorage.getItem('userID').then((value) => {
            console.log(value);
        });

    }


    search(value) {
        // TODO: 검색하는 메소드 작성
    }





    render() {
        //AsyncStorage.clear();
        return (
            <View style={styles.container}>
                <View style={styles.searchView}>
                    <TextInput
                        value={this.state.searchValue}
                        editable={true}
                        placeholder='음료 검색'
                        placeholderTextColor='#BDBDBD'
                        onChangeText={value => this.onChangeText(value)}
                        style={styles.searchInput}
                    />
                    <TouchableOpacity
                        style={styles.searchIcon}
                        onPress={() => this.search(this.state.searchValue)}
                    >
                        <Icon name='search' size={32} color='#7E7D7D' />
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>



                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    searchView: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        borderRadius: 30,
        paddingHorizontal: 5,
        marginHorizontal: 20,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    searchInput: {
        fontSize: 18,
        paddingLeft: 15,
        flex: 10,
    },
    searchIcon: {
        flex: 1,
        marginRight: 15,
        marginVertical: 5,
        justifyContent: 'center'
    },
    menuContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingTop: 1,
    },
    menuTitle: {
        color: '#FC8621',
        fontSize: 16,
        fontWeight: 'bold'
    },
    scrollView: {
        marginVertical: 5
    },
    menuItem: {
        marginHorizontal: 2,
    },
    menuItemImageView: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#FC8621',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cafe: {
        fontSize: 13,
        color: '#FC8621'
    },
    cafeName: {
        fontSize: 10,
        color: '#FC8621'
    },
    cafePrice: {
        color: '#FC8621',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 3
    },
    rankTextView: {
        flexDirection: 'row',
        paddingVertical: 2
    },
    rankNumberText: {
        paddingRight: 5
    },
    line: {
        marginBottom: 3,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    }
})

export default DrinkInfoComponent;