import {StackNavigator} from 'react-navigation'
import Home from './screen/Home.js'
import Trend from './screen/Trend.js'
import History from './screen/History.js'
import NewTrend from './screen/NewTrend.js'

let App = StackNavigator({
  Home: {screen: Home},
  Trend: {screen: Trend},
  History: {screen: History},
  NewTrend: {screen: NewTrend},
})

export default App
