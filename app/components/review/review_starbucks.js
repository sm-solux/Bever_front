import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StarbucksReviewList from "./Starbucks/starbucks_reviewList";
import StarbucksReviewView from "./Starbucks/starbucks_reviewView";
import StarbucksReviewPost from "./Starbucks/starbucks_post";

const StarbucksStack = createStackNavigator();

class ReviewStarbucks extends Component {
  render() {
    return (
      <StarbucksStack.Navigator>
        <StarbucksStack.Screen name='StarbucksReviewList' component={StarbucksReviewList} 
          options={{headerShown: false}}/>
        <StarbucksStack.Screen name='StarbucksReviewView' component={StarbucksReviewView} 
          options={{headerTitle: '목록보기', headerStyle: {height: 30}, headerTitleStyle: {fontSize: 18}}}/>
        <StarbucksStack.Screen name='StarbucksReviewPost' component={StarbucksReviewPost} options={{headerShown: false}}/>
      </StarbucksStack.Navigator>
    )
  }
}

export default ReviewStarbucks;