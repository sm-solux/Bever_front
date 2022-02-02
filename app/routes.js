import 'react-native-gesture-handler';
import React from 'react';

// Navigator
import { createStackNavigator } from '@react-navigation/stack'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// indexes
import SignIn from './components/auth/index_auth';
import AuthComponent from './components/auth/auth_nav';
import Home from './components/home/index_home';
import Review from './components/review/index_rev';
import Community from './components/community/index_com';
import Calendar from './components/calendar/index_cal';
import MyPage from './components/myPage/index_myp';

// import Recipe from './components/community/recipe_nav';
// import HeartsList from './components/community/hearts_list';
// import Post from './components/community/post';

// Logo
import LogoTitle from './utils/logo';

// import { isLoggedIn } from './components/auth/index_auth';
// Icon
import Icon from 'react-native-vector-icons/Ionicons';
import { create } from 'react-test-renderer';

const AuthStack = createStackNavigator();
const MenuDrawer = createDrawerNavigator();
const MainScreenTab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ReviewStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const CalendarStack = createStackNavigator();
// const MyPageStack = createStackNavigator();


const TabBarIcon = (focused, name) => {
  let iconName, iconSize;

  if (focused === true) iconSize = 32;
  else iconSize = 32;

  if (name === 'Home') {
    iconName = 'home-outline';
  } else if (name === 'Review') {
    iconName = 'cafe-outline';
    iconSize = 37;
  } else if (name === 'Community') {
    iconName = 'chatbubbles-outline';
  } else if (name === 'Calendar') {
    iconName = 'calendar-outline';
  }

  return <Icon name={iconName} size={iconSize} color='#fff'/>
}

const HomeStackComponent = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home_stack' component={Home} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  )
}

const ReviewStackComponent = () => {
  return (
    <ReviewStack.Navigator>
      <ReviewStack.Screen name='Review_stack' component={Review} options={{headerShown: false}}/>
    </ReviewStack.Navigator>
  )
}

const CommunityStackComponent = () => {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen name='Community_stack' component={Community} options={{headerShown: false}}/>
    </CommunityStack.Navigator>
  )
}

const CalendarStackComponent = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name='Calendar_stack' component={Calendar} options={{headerShown: false}}/>
    </CalendarStack.Navigator>
  )
}

// const MyPageStackComponent = () => {
//   return (
//     <MyPageStack.Navigator>
//       <MyPageStack.Screen name='MyPage' component={MyPage} />
//     </MyPageStack.Navigator>
//   )
// }

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          TabBarIcon(focused, route.name)
        ),
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: '#FEA82f',
        tabBarInactiveBackgroundColor: '#FC8621',
        tabBarLabelStyle: {
          color: '#fff'
        },
        tabBarHideOnKeyboard: true,
      })}>
      <MainScreenTab.Screen name="Home" component={HomeStackComponent} options={{headerShown: false}}/>
      <MainScreenTab.Screen name="Review" component={ReviewStackComponent} options={{headerShown: false}}/>
      <MainScreenTab.Screen name="Community" component={CommunityStackComponent} options={{headerShown: false}}/>
      <MainScreenTab.Screen name="Calendar" component={CalendarStackComponent} options={{headerShown: false}}/>
    </MainScreenTab.Navigator>
  )
}

export const RootNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#FC8621',
        },
        title: <LogoTitle />
      }}
    >
      <AuthStack.Screen name="SignIn" component={AuthComponent} options={{headerShown: false}}/>
      <AuthStack.Screen name="Main" component={AppTabComponent} />
      {/* { isLoggedIn ? (
        <AuthStack.Screen name="Main" component={AppTabComponent} />
      ) : (
        <AuthStack.Screen name="SignIn" component={AuthComponent} options={{headerShown: false}}/>
      )
      } */}
    </AuthStack.Navigator>
  )
}