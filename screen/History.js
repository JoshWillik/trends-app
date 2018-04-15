import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import {get} from '../storage.js'
const block_size = 20

export default class History extends React.Component {
  static navigationOptions = ({navigation}) => {
    let {params: {trend}} = navigation.state
    return {title: trend+' History'}
  }
  constructor(...args){
    super(...args)
    this.state = {trend: null}
  }
  storage_key() {
    return 'trend-'+this.props.navigation.state.params.id
  }
  componentDidMount() { this.load() }
  async load() {
    try {
    let trend = await get(this.storage_key())
    this.setState({trend})
    } catch (e) { console.error(e) }
  }
  render() {
    if (!this.state.trend) {
      return (
        <View style={{
          margin: 10, 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator/>
        </View>
      )
    }
    let {trend} = this.state
    let history = (trend.history || []).reverse()
    let type = trend.type || 'binary'
    let extra
    switch (type) {
      case 'binary':
        extra = {
          0: 'red',
          1: 'green',
        }
      break
    }
    let backgrounds = Object.assign({default: 'grey'}, extra)
    return (
      <View style={{
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
        {history.map(({date, value}) => (
          <View key={date} style={{
            backgroundColor: backgrounds[value] ||
              backgrounds.default,
            width: block_size,
            height: block_size,
            marginRight: 1,
            marginBottom: 1,
          }} />
        ))}
      </View>
    )
  }
}
