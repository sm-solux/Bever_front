import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EdiyaReviewList from "./Ediya/ediya_reviewList";
import EdiyaReviewView from "./Ediya/ediya_reviewView";
import EdiyaReviewPost from "./Ediya/ediya_post";

const EdiyaStack = createStackNavigator();

class ReviewEdiya extends Component {
  render() {
    return (
      <EdiyaStack.Navigator>
        <EdiyaStack.Screen name='EdiyaReviewList' component={EdiyaReviewList} 
          options={{headerShown: false}}/>
        <EdiyaStack.Screen name='EdiyaReviewView' component={EdiyaReviewView} 
          options={{headerTitle: '목록보기', headerStyle: {height: 30}, headerTitleStyle: {fontSize: 18}}}/>
        <EdiyaStack.Screen name='EdiyaReviewPost' component={EdiyaReviewPost} options={{headerShown: false}}/>
      </EdiyaStack.Navigator>
    )
  }
}

export default ReviewEdiya;