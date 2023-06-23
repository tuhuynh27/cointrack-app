import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.avatar}>
        <Image
          source={{uri: 'https://d33wubrfki0l68.cloudfront.net/19e8b1005d45f56e2c10ad30e215298ce50c677e/6f09c/tu-huynh.jpg'}}
          style={styles.avatarImage}></Image>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tu Huynh</Text>
        <Text style={styles.headerSecondaryText}>tu@keva.dev</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="black"/>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="log-out-outline" size={24} color="black"/>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="black"/>
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  avatar: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSecondaryText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  menu: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 10,
  },
})
