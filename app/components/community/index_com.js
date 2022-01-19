import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import RecipeComponent from "./recipe_nav";
import HeartComponent from './hearts_nav';
import HeartList from "./hearts_list";

const CommunityTab = createMaterialTopTabNavigator();

// const TabColor = (focused) => {
//   let color;
//   if (focused === true) color='#FCECDD';
//   else color='#FEA82F'
//   return color;
// }

class CommunityComponent extends Component {
  render() {
    return (
      <CommunityTab.Navigator
        screenOptions={{
          tabBarIndicatorContainerStyle: {
            backgroundColor: '#FC8621',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#FCECDD'
          },
          tabBarLabelStyle: {
            borderRadius: 100,
            paddingVertical: 10,
            paddingHorizontal: 50,
            fontWeight: 'bold',
            backgroundColor: '#FEA82F',
          }
        }}
      >
        <CommunityTab.Screen name='Recipe' component={RecipeComponent}/>
        <CommunityTab.Screen name='Hearts' component={HeartComponent}/>
      </CommunityTab.Navigator>
    )
  }
}

export default CommunityComponent;