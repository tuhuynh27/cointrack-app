import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import useCoinData from './useCoinData'
import { indexCoins } from './data'

const renderItem = ({ item, index }) => {
  return (
    <TouchableOpacity style={styles.rowContainer}>
      <View style={styles.rowHeading}>
        <View>
          <Image
            source={{uri: item.logo}}
            style={styles.rowImage}></Image>
        </View>
        <View>
          <Text style={styles.rowName}>{item.name}</Text>
          <Text style={styles.rowCode}>{item.code}</Text>
        </View>
      </View>
      <View style={styles.rowSecondary}>
        <Text style={styles.rowPrice}>USD {item.price}</Text>
        <Text style={[
          styles.rowChange,
          item.change >= 0 ? styles.positiveChange : styles.negativeChange
        ]}>{item.change}%</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  const { state: data, isLoaded } = useCoinData(indexCoins)

  const marketStatus = data.reduce((sum, coin) => sum + parseFloat(coin.change), 0) / data.length

  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={<View style={styles.heading}>
          <Text style={styles.headingSecondaryText}>In the past 24 hours</Text>
          <Text style={styles.headingText}>Market is {marketStatus >= 0 ? 'up' : 'down'} <Text style={{ color: marketStatus >= 0 ? 'green' : 'red' }}>{Math.abs(marketStatus).toFixed(2)}%</Text></Text>
        </View>}
        data={data}
        keyExtractor={item => item.code}
        renderItem={renderItem}
        contentContainerStyle={styles.tableContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    flexDirection: 'column',
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
  },
  headingSecondaryText: {
    color: '#5b616e',
  },
  tableContainer: {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  rowSecondary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rowImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  rowName: {
    fontSize: 18,
  },
  rowCode: {
    color: '#5b616e',
    fontSize: 18,
  },
  rowPrice: {
    fontSize: 18,
  },
  rowChange: {
    fontSize: 18,
  },
  positiveChange: {
    color: 'green'
  },
  negativeChange: {
    color: 'red'
  }
})
