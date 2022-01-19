import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TomNTomsReviewList from "./TomNToms/tomntoms_reviewList";
import TomNTomsReviewView from "./TomNToms/tomntoms_reviewView";
import TomNTomsReviewPost from "./TomNToms/tomntoms_post";

const TomNTomsStack = createStackNavigator();

class ReviewTomNToms extends Component {
  render() {
    return (
      <TomNTomsStack.Navigator>
        <TomNTomsStack.Screen name='TomNTomsReviewList' component={TomNTomsReviewList} 
          options={{headerShown: false}}/>
        <TomNTomsStack.Screen name='TomNTomsReviewView' component={TomNTomsReviewView} 
          options={{headerTitle: '목록보기', headerStyle: {height: 30}, headerTitleStyle: {fontSize: 18}}}/>
        <TomNTomsStack.Screen name='TomNTomsReviewPost' component={TomNTomsReviewPost} options={{headerShown: false}}/>
      </TomNTomsStack.Navigator>
    )
  }
}

export default ReviewTomNToms;