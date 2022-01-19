import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HollysReviewList from "./Hollys/hollys_reviewList";
import HollysReviewView from "./Hollys/hollys_reviewView";
import HollysReviewPost from "./Hollys/hollys_post";

const HollysStack = createStackNavigator();

class ReviewHollys extends Component {
  render() {
    return (
      <HollysStack.Navigator>
        <HollysStack.Screen name='HollysReviewList' component={HollysReviewList} 
          options={{headerShown: false}}/>
        <HollysStack.Screen name='HollysReviewView' component={HollysReviewView} 
          options={{headerTitle: '목록보기', headerStyle: {height: 30}, headerTitleStyle: {fontSize: 18}}}/>
        <HollysStack.Screen name='HollysReviewPost' component={HollysReviewPost} 
          options={{headerShown: false}}/>
      </HollysStack.Navigator>
    )
  }
}

export default ReviewHollys;