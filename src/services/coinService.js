import axios from 'axios'

export const coinService = {
  getCoinsData,
  sortRates,
}

async function getCoinsData(timePeriod) {
  let history = {
    '1min': 'histominute?aggregate=1&e',
    '5min': 'histominute?aggregate=5&e',
    '1hour': 'histohour?aggregate=1&e',
    '1week': 'histoday?aggregate=6&e',
  }[timePeriod]

  const BASE_URL = `https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/${history}=CCCAGG&fsym=BTC&tsym=usd&limit=30`
  const { data } = await axios.get(BASE_URL)
  return data
}

function sortRates(name, type, coins) {
  if (!coins.data) return coins
  if (name === 'Date') {
    if (type === 'ascending') {
      coins.data.sort((a, b) => {
        return new Date(a[name]) - new Date(b[name])
      })
    } else {
      coins.data.sort((a, b) => {
        return new Date(b[name]) - new Date(a[name])
      })
    }
  }

  if (type === 'ascending')
    coins.data.sort((a, b) => (a[name] < b[name] ? 1 : -1))
  else {
    coins.data.sort((a, b) => (a[name] > b[name] ? 1 : -1))
  }
  return coins
}
