import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TwosomeReviewList from "./Twosome/twosome_reviewList";
import TwosomeReviewView from "./Twosome/twosome_reviewView";
import TwosomeReviewPost from "./Twosome/twosome_post";

const TwosomeStack = createStackNavigator();

class ReviewTwosome extends Component {
  render() {
    return (
      <TwosomeStack.Navigator>
        <TwosomeStack.Screen name='TwosomeReviewList' component={TwosomeReviewList} 
          options={{headerShown: false}}/>
        <TwosomeStack.Screen name='TwosomeReviewView' component={TwosomeReviewView} 
        initialParams={{ 'key': 0, 'uri': '', 'title': '', 'date': '', 'writer': '', 'rate': '' }}
          options={{headerTitle: '목록보기', headerStyle: {height: 30}, headerTitleStyle: {fontSize: 18}}}/>
        <TwosomeStack.Screen name='TwosomeReviewPost' component={TwosomeReviewPost} options={{headerShown: false}}/>
      </TwosomeStack.Navigator>
    )
  }
}

export default ReviewTwosome;