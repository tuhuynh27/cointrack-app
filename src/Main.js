import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from './screens/home/Home'
import ChatScreen from './screens/chat/Chat'
import ProfileScreen from './screens/profile/Profile'

const Tab = createBottomTabNavigator();

const Main = () => {
  const [activeTab, setActiveTab] = useState('home')
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'home') {
              iconName = focused
                ? 'newspaper'
                : 'newspaper-outline';
            } else if (route.name === 'chat') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="chat" component={ChatScreen} />
        <Tab.Screen name="profile" component={ProfileScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 0,
    paddingVertical: 10
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#f2f2f2',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Main
