import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeDetail from '../screens/recipeDetail/RecipeDetail';
import TabNavigation from './TabNavigation';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={TabNavigation} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
