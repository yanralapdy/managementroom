import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from 'react-navigation-stack';

import room from '../screen/Room';
import checkin from '../screen/Checkin';
import customer from '../screen/Customer';
import profile from '../screen/Profile';

const stack = createStackNavigator({
  Profile: {
    screen: profile,
    navigationOptions: {
      header: null,
    },
  },
});
export default createMaterialBottomTabNavigator(
  {
    checkin: {
      screen: checkin,
      navigationOptions: {
        tabBarLabel: 'CheckIn',
        tabBarIcon: ({tintColor}) => (
          <Icon name="check-circle" color={tintColor} size={25} />
        ),
      },
    },
    room: {
      screen: room,
      navigationOptions: {
        tabBarLabel: 'Room',
        tabBarIcon: ({tintColor}) => (
          <Icon name="bed" color={tintColor} size={25} />
        ),
      },
    },
    customer: {
      screen: customer,
      navigationOptions: {
        tabBarLabel: 'Customer',
        tabBarIcon: ({tintColor}) => (
          <Icon name="id-card-o" color={tintColor} size={25} />
        ),
      },
    },
    Stack: {
      screen: stack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user-circle" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    intialRouteName: 'room',
    order: ['checkin', 'room', 'customer', 'Stack'],
    activeColor: 'white',
    inactiveColor: 'black',
    barStyle: {
      backgroundColor: '#718093',
      height: 80,
      justifyContent: 'space-evenly',
    },
    borderTopColor: 'black',
    borderTopWidth: 3,
  },
);
