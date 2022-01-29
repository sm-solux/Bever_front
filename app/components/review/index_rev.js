import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ReviewLogo from './review_logo';
import ReviewStarbucks from './review_starbucks';
import ReviewHollys from "./review_hollys";
import ReviewEdiya from "./review_ediya";
import ReviewTwosome from "./review_twosome";

const ReviewStack = createStackNavigator();

class ReviewComponent extends Component {
  render() {
    return (
      <ReviewStack.Navigator>
        <ReviewStack.Screen name='ReviewLogo' component={ReviewLogo} options={{headerShown: false}}/>
        <ReviewStack.Screen name='ReviewStarbucks' component={ReviewStarbucks} 
          options={{headerTitle: 'STARBUCKS', headerTitleAlign: 'center', 
            headerStyle: {backgroundColor: '#036635', height: 50}, headerTintColor: '#fff'}}/>
        <ReviewStack.Screen name='ReviewHollys' component={ReviewHollys} 
          options={{headerTitle: 'HOLLYS COFFEE', headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#BA000D', height: 50}, headerTintColor: '#fff'}}/>
        <ReviewStack.Screen name='ReviewEdiya' component={ReviewEdiya} 
          options={{headerTitle: 'EDIYA COFFEE', headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#002E6C', height: 50}, headerTintColor: '#fff'}}/>
        <ReviewStack.Screen name='ReviewTwosome' component={ReviewTwosome} 
          options={{headerTitle: 'A TWOSOME PLACE', headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#CA1A36', height: 50}, headerTintColor: '#fff'}}/>
      </ReviewStack.Navigator>
    )
  }
}

export default ReviewComponent;