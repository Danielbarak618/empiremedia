import { coinService } from '../../services/coinService.js'

export function loadCoinData(history) {
  return async (dispatch) => {
    const rates = await coinService.getCoinsData(history)
    dispatch({ type: 'SET_RATES', rates })
  }
}

export function sortData({ name, type }) {
  return (dispatch, getState) => {
    const data = getState().coin
    if (!data) return
    const rates = coinService.sortRates(name, type, data.rates)
    dispatch({ type: 'SET_RATES', rates })
  }
}
