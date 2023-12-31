import { useState, useCallback, useEffect, useReducer } from 'react'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function reducer(state, action) {
  switch (action.type) {
    case 'updatePrices':
      const pricesObj = action.data
      return state.map(e => {
        if (pricesObj[e.code]) {
          return {
            ...e,
            price: pricesObj[e.code],
          }
        }
        return e
      })
    case 'updateChanges':
      const changesObj = action.data
      return state.map(e => {
        if (changesObj[e.code]) {
          return {
            ...e,
            price: e.price === 0 ? changesObj[e.code].price : e.price,
            change: changesObj[e.code].change,
            volume: changesObj[e.code].volume,
            highPrice: changesObj[e.code].highPrice,
            lowPrice: changesObj[e.code].lowPrice,
          }
        }
        return e
      })
    default:
      throw new Error()
  }
}

function init(coins) {
  if (savedObj.data) {
    return savedObj.data
  }
  return coins.map(e => ({
    ...e,
    price: 0,
    change: 0,
    volume: 0,
    highPrice: 0,
    lowPrice: 0,
  }))
}

const savedObj = {
  data: null
}

export default function useCoinData(coins = [], limit = 0) {
  const [state, dispatch] = useReducer(reducer, coins, init)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    savedObj.data = state;
  }, [state]);

  const loadMeta = useCallback(
    async (controller) => {
      const obj = Object.create(null)
      for (const e of coins) {
        const resp = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${e.code}USDT`)
        const data = await resp.json()
        const change = parseFloat(data.priceChangePercent)
        const avg = (parseFloat(data.highPrice) + parseFloat(data.lowPrice)) / 2
        const rawVolume = (parseFloat(data.volume) * avg).toFixed(0)
        const volume = (rawVolume / 1000000).toFixed(2)
        const volumeStr = volume > 1000 ? `${(volume / 1000).toFixed(2)}B` : `${volume}M`
        const lastPrice = parseFloat(data.lastPrice)
        const highPrice = parseFloat(data.highPrice).toFixed(2)
        const lowPrice = parseFloat(data.lowPrice).toFixed(2)
        obj[e.code] = {
          price: lastPrice,
          change: change.toFixed(2),
          volume: volumeStr,
          highPrice: highPrice,
          lowPrice: lowPrice,
        }
      }
      if (controller.isCancelled) {
        return
      }
      dispatch({ type: 'updateChanges', data: obj })
      setIsLoaded(true)
    }, [coins]
  )

  useEffect(() => {
    const controller = { isCancelled: false }
    void loadMeta(controller)
    const interval = setInterval(() => {
      void loadMeta(controller)
    }, 5000)
    return () => {
      controller.isCancelled = true
      clearInterval(interval)
    }
  }, [loadMeta])

  useEffect(() => {
    const controller = { isCancelled: false }
    // Batch update prices
    let obj = Object.create(null)
    const interval = setInterval(() => {
      if (controller.isCancelled) {
        return
      }
      dispatch({
        type: 'updatePrices',
        data: obj,
      })
      obj = Object.create(null)
    }, 500)

    function updateRealtime(e) {
      const payload = JSON.parse(e.data)
      const { stream, data } = payload
      const priceFloat = parseFloat(data.p)
      const price = priceFloat.toFixed(2)
      const code = stream.substring(0, 3).toUpperCase()
      obj[code] = price
    }

    const listWatchStream = coins.map(e =>`${e.code.toLowerCase()}usdt@aggTrade`)
    const connectStr = listWatchStream.join('/')
    let socket = null
    let timeout = null
    function reconnect(e) {
      socket.close()
      socket = null
      timeout = setTimeout(() => connect(), 1000)
    }

    async function connect() {
      await sleep(500)
      socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=' + connectStr)
      socket.addEventListener('message', updateRealtime)
      socket.addEventListener('error', reconnect)
      socket.addEventListener('close', reconnect)
    }

    void connect()

    return () => {
      controller.isCancelled = true
      clearInterval(interval)
      clearTimeout(timeout)
      if (socket) {
        socket.removeEventListener('message', updateRealtime)
        socket.removeEventListener('error', reconnect)
        socket.removeEventListener('close', reconnect)
        socket.close()
        socket = null
      }
    }
  }, [coins])

  return { state, isLoaded }
}
