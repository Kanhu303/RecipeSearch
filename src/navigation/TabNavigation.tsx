import {Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatBot from '../screens/chatbot/ChatBot';
import ICONS from '../../assets/images';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconSource;

          if (route.name === 'Chatbot') {
            iconSource = ICONS.CHAT_BOT;
          }

          return (
            <Image
              source={iconSource}
              style={{height: size, width: size, tintColor: color}}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Chatbot" component={ChatBot} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
