import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { createStackNavigator } from "@react-navigation/stack";
import HomeComponent from "./index_home";
import DrinkInfoComponent from "./index_drinkinfo";


const HomeTab = createStackNavigator();


class HomeNavComponent extends Component {
    render() {
        return (
            <HomeTab.Navigator>
                <HomeTab.Screen name='Home' component={HomeComponent} options={{headerShown: false}} />
                <HomeTab.Screen name='DrinkInfo' component={DrinkInfoComponent}  />

            </HomeTab.Navigator>
        )
    }
}

export default HomeNavComponent;