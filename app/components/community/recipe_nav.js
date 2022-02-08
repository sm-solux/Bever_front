import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostScreen from "./post";
import RecipeList from "./recipe_list";
import RecipeViewScreen from "./recipe_view";

const RecipeStack = createStackNavigator();

class RecipeComponent extends Component {
  render() {
    return (
      <RecipeStack.Navigator>
        <RecipeStack.Screen name='RecipeList' component={RecipeList} options={{headerShown: false}}/>
        <RecipeStack.Screen name='Post' component={PostScreen} options={{headerShown: false}}/>
        <RecipeStack.Screen name='RecipeView' component={RecipeViewScreen}
        initialParams={{ 'recipe': {}, 'isscraped':false }}
          options={{headerTitle: 'Community',}}
        />
      </RecipeStack.Navigator>
    )
  }
}

export default RecipeComponent;