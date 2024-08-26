import {View, Text} from 'react-native';
import React, {FC} from 'react';
import TabNavigation from './src/navigation/TabNavigation';
import HomeStack from './src/navigation/StackNavigation';

const App: FC = () => {
  return <HomeStack />;
};

export default App;
