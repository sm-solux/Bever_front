import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HeartList from './hearts_list';
import RecipeView from './recipe_view';

const HeartStack = createStackNavigator();

class HeartComponent extends Component {
  render() {
    return (
      <HeartStack.Navigator>
        <HeartStack.Screen name='HeartList' component={HeartList} options={{headerShown: false}}/>
        <HeartStack.Screen name='RecipeView' component={RecipeView} 
          options={{headerTitle: 'Community',}}/>
      </HeartStack.Navigator>
    )
  }
}

export default HeartComponent;