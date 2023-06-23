import { useState } from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from './screens/home/Home'
import ChatScreen from './screens/chat/Chat'
import ProfileScreen from './screens/profile/Profile'

const Layout = () => {
  const [activeTab, setActiveTab] = useState('home')

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen/>
      case 'chat':
        return <ChatScreen/>
      case 'profile':
        return <ProfileScreen/>
      default:
        return <HomeScreen/>
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('home')}>
          <Icon name={activeTab === 'home' ? 'reader' : 'reader-outline'} size={25} color="#000"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('chat')}>
          <Icon name={activeTab === 'chat' ? 'chatbubble' : 'chatbubble-outline'} size={25} color="#000"/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('profile')}>
          <Icon name={activeTab === 'profile' ? 'person' : 'person-outline'} size={25} color="#000"/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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

export default Layout
