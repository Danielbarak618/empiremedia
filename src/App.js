import { useEffect } from 'react'
import Header from './components/Header'
import GlobalStyles from './styles/GlobalStyles'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Overview from './pages/Overview'
import History from './pages/History'
import { Container } from './styles/Container'
import Buttons from './components/Buttons'
import { useDispatch } from 'react-redux'
import { loadCoinData } from './store/actions/coin-actions'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCoinData('1min'))
  })

  return (
    <HashRouter>
      <Container>
        <GlobalStyles />
        <Header />
        <Buttons />

        <Switch>
          <Route path='/' exact component={Overview} />
          <Route path='/history' exact component={History} />
        </Switch>
      </Container>
    </HashRouter>
  )
}

export default App
