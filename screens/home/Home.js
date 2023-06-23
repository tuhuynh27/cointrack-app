import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useCoinData from './useCoinData'

export const indexCoins = [
  {
    name: 'Bitcoin',
    code: 'BTC',
    logo: 'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png'
  },
  {
    name: 'Ethereum',
    code: 'ETH',
    logo: 'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png'
  },
  {
    name: 'BNB',
    code: 'BNB',
    logo: 'https://dynamic-assets.coinbase.com/4861e50787caa9405703c71e788467e8242f5d15a7a51335c299dc3e87a8d1d08bfd19ab67ad8bb2581b525af27c8dcbd0c78ede837eeaff75ae9b96716bf75e/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png'
  },
  {
    name: 'Solana',
    code: 'SOL',
    logo: 'https://dynamic-assets.coinbase.com/2eefc7ffd92b6460ebdcab6fd67e384146ecdec29bff68d78f68b5d9cb9af05652a8d78087b6090c6d598f8fb9af1c3c062c33df15d0db3ba8e465b819841820/asset_icons/fd6899026b1e517bbb7995e5c992c71dc33b85edb3b28b66591579d6706deab2.png'
  },
  {
    name: 'XRP',
    code: 'XRP',
    logo: 'https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png'
  },
  {
    name: 'Terra',
    code: 'LUNA',
    logo: 'https://dynamic-assets.coinbase.com/349c78bb0cca8d9a48d660f500b43a88417337074e4948b964c005252a999548b514b9d06b177b5392421996329ef3b944e80638151f21ae445e8c7a19a78d4f/asset_icons/2925e68c9ec25fc3cffa661d2f5d88798a10c191ea613dd4c3951ab86904ad69.png'
  },
  {
    name: 'Cardano',
    code: 'ADA',
    logo: 'https://dynamic-assets.coinbase.com/da39dfe3632bf7a9c26b5aff94fe72bc1a70850bc488e0c4d68ab3cf87ddac277cd1561427b94acb4b3e37479a1f73f1c37ed311c11a742d6edf512672aea7bb/asset_icons/a55046bc53c5de686bf82a2d9d280b006bd8d2aa1f3bbb4eba28f0c69c7597da.png'
  },
  {
    name: 'Avalanche',
    code: 'AVAX',
    logo: 'https://dynamic-assets.coinbase.com/35f69b8c1f2c2771170e72bdb61a986b17f7d8d20c5e10bc4fc347fe301e6137960c01c31ebbac976b9fd933bf95344d751e052a27eee0dc868f8c036bb2632a/asset_icons/d8a464a40be5c1eba32428ed1d815c878d4933231193edfa483957bd3cbfe750.png'
  },
  {
    name: 'Polkadot',
    code: 'DOT',
    logo: 'https://dynamic-assets.coinbase.com/9957ebecd9f4d6a2a4cf877577364e8c9bfb937c7f8385e153fc878e9ed3766a563cdd1a80903f465f50b4edfb5089251e045d362a8fbe5b888b9de18bfcc09a/asset_icons/f786d2f3573f77db841b406bf607ac7ddfe70d533acc6d05f2cb3cb3eab11925.png'
  },
  {
    name: 'Dogecoin',
    code: 'DOGE',
    logo: 'https://dynamic-assets.coinbase.com/3803f30367bb3972e192cd3fdd2230cd37e6d468eab12575a859229b20f12ff9c994d2c86ccd7bf9bc258e9bd5e46c5254283182f70caf4bd02cc4f8e3890d82/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png'
  },
]

export default function HomeScreen() {
  const { state: data, isLoaded } = useCoinData(indexCoins)

  const marketStatus = data.reduce((sum, coin) => sum + parseFloat(coin.change), 0) / data.length

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.rowContainer}>
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
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.headingSecondaryText}>In the past 24 hours</Text>
        <Text style={styles.headingText}>Market is {marketStatus >= 0 ? 'up' : 'down'} <Text style={{ color: marketStatus >= 0 ? 'green' : 'red' }}>{Math.abs(marketStatus).toFixed(2)}%</Text></Text>
      </View>
      <FlatList
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
