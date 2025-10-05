import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import StatsScreen from './src/screens/StatsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { TransactionProvider } from './src/hooks/useTransactions';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Transacciones') {
            iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted';
          } else if (route.name === 'Estadísticas') {
            iconName = focused ? 'chart-pie' : 'chart-pie';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Transacciones" component={TransactionsScreen} />
      <Tab.Screen name="Estadísticas" component={StatsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <TransactionProvider>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AddTransaction" 
            component={AddTransactionScreen}
            options={{
              title: 'Nueva Transacción',
              headerStyle: {
                backgroundColor: '#6366f1',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
};

export default App;